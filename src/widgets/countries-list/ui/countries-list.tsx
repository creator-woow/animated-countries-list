'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import { AppConfig } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import {
  Size,
  VirtualList,
  VirtualListAutoSizer,
  VirtualListChildProps,
} from 'shared/ui';
import { Country } from 'entities/country';
import { PropsWithClassName } from 'shared/types/props';
import { clsx } from 'shared/lib';
import { useDebouncedCallback } from 'shared/lib/hooks';

import { LIST_ITEM_HEIGHT, SCROLL_INDEX_PARAM_NAME } from '../lib/const';
import { CountriesListElement } from './countries-list-element';

interface CountriesListProps extends PropsWithClassName {
  countries: Country[];
  messages: AppConfig['Messages']['countries'];
}

export const CountriesList: FC<CountriesListProps> = ({
  className,
  messages,
  countries: countriesProp,
}) => {
  const searchParams = useSearchParams();
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);
  const [countries, setCountries] = useState(countriesProp);
  const [deletingCountriesCodes, setDeletingCountriesCodes] = useState<
    string[]
  >([]);

  const deletingIndexes = useMemo(
    () =>
      deletingCountriesCodes
        .map((code) => countries.findIndex((el) => el.iso_code3 === code))
        .filter((idx) => idx !== -1),
    [countries, deletingCountriesCodes],
  );

  const initialVisibleIndex = Number(
    searchParams?.get(SCROLL_INDEX_PARAM_NAME) ?? 1,
  );

  const saveVisibleIndex = useDebouncedCallback((index: number) => {
    window.history.replaceState(
      null,
      '',
      `?${SCROLL_INDEX_PARAM_NAME}=${index}`,
    );
  }, 200);

  const handleItemsRender = useCallback(
    (startVisibleIndex: number, stopVisibleIndex: number) => {
      saveVisibleIndex(startVisibleIndex);
      if (stopVisibleIndex !== lastVisibleIndex)
        setLastVisibleIndex(stopVisibleIndex);
    },
    [lastVisibleIndex, saveVisibleIndex],
  );

  const deleteItem = useCallback((countryCode: string) => {
    setCountries((prev) => prev.filter((el) => el.iso_code3 !== countryCode));
    setDeletingCountriesCodes((prev) =>
      prev.filter((code) => code !== countryCode),
    );
  }, []);

  const startDeletingAnimations = useCallback((deletingCountryCode: string) => {
    setDeletingCountriesCodes((prev) => {
      if (prev.includes(deletingCountryCode)) {
        return prev;
      }
      return [...prev, deletingCountryCode];
    });
  }, []);

  const renderVirtualListElement = useCallback(
    (
      props: VirtualListChildProps<Country[]> & {
        width: number;
        height: number;
        listHasOverflow: boolean;
      },
    ) => {
      const country = props.data[props.index];
      if (!country) return null;

      const countryCode = country.iso_code3;
      const isDeleting = deletingCountriesCodes.includes(countryCode);
      const isLastScreenVisible = lastVisibleIndex === countries.length - 1;

      return (
        <CountriesListElement
          {...props}
          messages={messages}
          isDeleting={isDeleting}
          isComingUp={deletingIndexes.some(
            (deletingIndex) =>
              (!props.listHasOverflow || !isLastScreenVisible) &&
              props.index > deletingIndex,
          )}
          isComingDown={
            props.listHasOverflow &&
            isLastScreenVisible &&
            deletingIndexes.some((deletingIndex) => deletingIndex > props.index)
          }
          onDelete={() => deleteItem(countryCode)}
          onStartDeleteAnimations={() => startDeletingAnimations(countryCode)}
        />
      );
    },
    [
      countries.length,
      deleteItem,
      deletingCountriesCodes,
      deletingIndexes,
      lastVisibleIndex,
      messages,
      startDeletingAnimations,
    ],
  );

  const render = useCallback(
    ({ width, height }: Size) => {
      return (
        <ul>
          <VirtualList
            itemData={countries}
            itemSize={LIST_ITEM_HEIGHT}
            height={height}
            itemCount={countries.length}
            width={width}
            itemKey={(index) => countries[index].iso_code3}
            initialScrollOffset={initialVisibleIndex * LIST_ITEM_HEIGHT}
            overscanCount={20}
            useIsScrolling={false}
            onItemsRendered={({ visibleStartIndex, visibleStopIndex }) =>
              handleItemsRender(visibleStartIndex, visibleStopIndex)
            }
          >
            {(props) =>
              renderVirtualListElement({
                ...props,
                width,
                height,
                listHasOverflow:
                  Math.floor(height / LIST_ITEM_HEIGHT) < countries.length,
              })
            }
          </VirtualList>
        </ul>
      );
    },
    [
      countries,
      initialVisibleIndex,
      handleItemsRender,
      renderVirtualListElement,
    ],
  );

  return (
    <div className={clsx(className, 'h-full w-full border overflow-hidden')}>
      <VirtualListAutoSizer>{render}</VirtualListAutoSizer>
    </div>
  );
};
