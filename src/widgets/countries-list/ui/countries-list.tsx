'use client';

import { AppConfig } from 'next-intl';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  Button,
  Image,
  Link,
  VirtualList,
  VirtualListAutoSizer,
  VirtualListChildProps,
} from 'shared/ui';
import { RouteParam, RoutePath } from 'shared/config';
import { Country, CountryFlag } from 'entities/country';
import { useDebouncedCallback } from 'shared/lib/hooks';

import { LIST_ITEM_HEIGHT, SCROLL_INDEX_PARAM_NAME } from '../lib/const';
import { clsx } from 'shared/lib';

interface CountriesListProps {
  className?: string;
  countries: Country[];
  messages: AppConfig['Messages']['countries'];
}

const CountriesListElement = ({
  index,
  data: countries,
  messages,
  style,
}: VirtualListChildProps<Country[]> & {
  messages: AppConfig['Messages']['countries'];
  onDelete: (index: number) => void;
}) => {
  const country = countries[index];

  return (
    <li
      key={country.iso_code3}
      className="flex items-center gap-4 p-2 p-4 not-last:border-b border-gray-300"
      style={style}
    >
      <CountryFlag
        className="h-[30px]"
        url={country.flag_url}
        alt={country.name_ru}
        width={50}
        height={30}
      />
      <span className="truncate">{country.name_ru}</span>
      <div className="ml-auto flex items-center gap-3">
        <Button>{messages['delete']}</Button>
        <Link
          href={RoutePath.Country.replace(
            RouteParam.CountryCode,
            country.iso_code3,
          )}
        >
          {messages['more-details']}
        </Link>
      </div>
    </li>
  );
};

export const CountriesList: FC<CountriesListProps> = ({
  className,
  messages,
  countries,
}) => {
  const searchParams = useSearchParams();
  const initialVisibleIndex = +(
    searchParams?.get(SCROLL_INDEX_PARAM_NAME) ?? 1
  );

  const saveVisibleIndex = (index: number) => {
    window.history.replaceState(
      null,
      '',
      `?${SCROLL_INDEX_PARAM_NAME}=${index}`,
    );
  };

  const debounceIndexSave = useDebouncedCallback(saveVisibleIndex, 200);

  const handleItemsRender = (firstVisibleIndex: number) => {
    debounceIndexSave.cancel();
    debounceIndexSave(firstVisibleIndex);
  };

  const handleDeleteItem = () => {};

  return (
    <div className={clsx(className, 'w-full h-full border border-gray-300')}>
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
              overscanCount={5}
              onItemsRendered={(props) =>
                handleItemsRender(props.visibleStartIndex)
              }
            >
              {(props) => (
                <CountriesListElement
                  {...props}
                  messages={messages}
                  onDelete={handleDeleteItem}
                />
              )}
            </VirtualList>
          </ul>
        )}
      </VirtualListAutoSizer>
    </div>
  );
};
