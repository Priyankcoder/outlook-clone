import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { QUERY_PARAMS, FILTERS } from "../../utils/interface";
import styles from "./filter.module.scss";
import cx from "classnames";

interface IFilterProps {
  activeFilter: string | null;
}

const Filter = (props: IFilterProps) => {
  const { activeFilter = FILTERS.UNREAD } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilterClick = (selectedFilter: keyof typeof FILTERS) => {
    if (activeFilter === FILTERS[selectedFilter]) {
      return;
    }
    let updatedQueryParams = {};
    searchParams.forEach((value, key) => {
      updatedQueryParams[key] = value;
    });
    delete updatedQueryParams[QUERY_PARAMS.EMAIL_ID];
    setSearchParams({
      ...updatedQueryParams,
      [QUERY_PARAMS.FILTER]: FILTERS[selectedFilter]
    });
  };

  return (
    <div className={styles.filterContainer}>
      <span className={styles.filterText}>Filter By:</span>
      {(Object.keys(FILTERS) as Array<keyof typeof FILTERS>).map(
        (filter, index) => {
          return (
            <span
              onClick={() => handleFilterClick(filter)}
              key={index}
              className={cx({
                [styles.active]: FILTERS[filter] === activeFilter
              })}
            >
              {FILTERS[filter]}
            </span>
          );
        }
      )}
    </div>
  );
};

export default Filter;
