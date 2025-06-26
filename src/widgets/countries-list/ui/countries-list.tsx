'use client';

import { FC, useState } from 'react';
import { AppConfig } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { VirtualList, VirtualListAutoSizer } from 'shared/ui';
import { Country } from 'entities/country';
import { clsx } from 'shared/lib';
import { useDebouncedCallback } from 'shared/lib/hooks';

import {
  DELETING_ANIMATION_DURATION_MILLISECONDS,
  LIST_ITEM_HEIGHT,
  SCROLL_INDEX_PARAM_NAME,
} from '../lib/const';
import { CountriesListElement } from './countries-list-element';

interface CountriesListProps {
  className?: string;
  countries: Country[];
  messages: AppConfig['Messages']['countries'];
}

export const CountriesList: FC<CountriesListProps> = ({
  className,
  messages,
  countries: countriesProp,
}) => {
  const searchParams = useSearchParams();
  const [countries, setCountries] = useState(countriesProp);
  const [deletingCountriesCodes, setDeletingCountriesCodes] = useState<
    string[]
  >([]);

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

  const handleItemsRender = (firstVisibleIndex: number) => {
    saveVisibleIndex(firstVisibleIndex);
  };

  const deleteItem = (countryCode: string) => {
    setCountries((prev) => prev.filter((el) => el.iso_code3 !== countryCode));
    setDeletingCountriesCodes((prev) =>
      prev.filter((code) => code !== countryCode),
    );
  };

  const startDeletingAnimations = (deletingCountryCode: string) => {
    setDeletingCountriesCodes((prev) => [...prev, deletingCountryCode]);
    setTimeout(
      () => deleteItem(deletingCountryCode),
      DELETING_ANIMATION_DURATION_MILLISECONDS,
    );
  };

  return (
    <div className={clsx(className, 'h-full w-full border overflow-x-hidden')}>
      <VirtualListAutoSizer>
        {({ width, height }) => (
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
              onItemsRendered={({ visibleStartIndex }) =>
                handleItemsRender(visibleStartIndex)
              }
            >
              {(props) => {
                const countryCode = props.data[props.index].iso_code3;
                const isDeleting = deletingCountriesCodes.includes(countryCode);
                const deletedIndexes = deletingCountriesCodes.map((code) =>
                  countries.findIndex((el) => el.iso_code3 === code),
                );
                const isLastScreen =
                  props.index >=
                  countries.length - Math.ceil(height / LIST_ITEM_HEIGHT);
                const isComingUp =
                  !isLastScreen &&
                  deletedIndexes.some(
                    (deletedIndex) => props.index > deletedIndex,
                  );
                const isComingDown =
                  isLastScreen &&
                  deletedIndexes.some(
                    (deletedIndex) => deletedIndex > props.index,
                  );

                return (
                  <CountriesListElement
                    {...props}
                    key={countryCode}
                    messages={messages}
                    isDeleting={isDeleting}
                    isComingUp={isComingUp}
                    isComingDown={isComingDown}
                    onStartDeleteAnimations={() =>
                      startDeletingAnimations(countryCode)
                    }
                  />
                );
              }}
            </VirtualList>
          </ul>
        )}
      </VirtualListAutoSizer>
    </div>
  );
};
