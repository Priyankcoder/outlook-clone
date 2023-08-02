import {
  EmailList,
  EmailMetaData,
  FILTERS,
  QUERY_PARAMS
} from "../../utils/interface";

import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  readFromLocalStorage,
  transformToArray,
  formatDate
} from "../../utils/helperFunctions";

import cx from "classnames";
import styles from "./listView.module.scss";
import Filter from "../filter/Filter";

interface IListViewProps {
  activeFilter: string | null;
  emailId: string | null;
  emailData: EmailMetaData[];
}

const ListView = (props: IListViewProps) => {
  const { activeFilter, emailId, emailData } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    function calculateData() {
      const readEmails = transformToArray(readFromLocalStorage("read") || {});
      if (activeFilter === FILTERS.FAVOURITE) {
        const favouriteEmails = transformToArray(
          readFromLocalStorage("favourite") || {}
        );
        return emailData?.filter((metaData: EmailMetaData) => {
          return favouriteEmails.includes(metaData.id);
        });
      } else if (activeFilter === FILTERS.READ) {
        return emailData?.filter((metaData: EmailMetaData) => {
          return readEmails.includes(metaData.id);
        });
      }

      return emailData?.filter((metaData: EmailMetaData) => {
        return !readEmails.includes(metaData.id);
      });
    }

    const dataToRender = calculateData();
    setListData(calculateData());
  }, [activeFilter, emailData]);

  const handleEmailListItemClick = (selectedEmailId: string) => {
    if (selectedEmailId === emailId) {
      return;
    }
    let updatedQueryParams = {};
    searchParams.forEach((value, key) => {
      updatedQueryParams[key] = value;
    });
    setSearchParams({
      ...updatedQueryParams,
      [QUERY_PARAMS.EMAIL_ID]: selectedEmailId
    });
  };

  return (
    <div
      className={cx(styles.listContainer, {
        [styles.fullWidth]: emailId === null
      })}
    >
      {listData?.map((metaData: EmailMetaData) => {
        return (
          <article
            className={cx(styles.listItem, {
              [styles.active]: emailId === metaData?.id,
              [styles.read]: activeFilter === FILTERS.READ
            })}
            onClick={() => handleEmailListItemClick(metaData.id)}
          >
            <span className={styles.avatar}>{metaData?.from?.name[0]}</span>
            <div className={styles.cardDetails}>
              <section className={styles.senderDetails}>
                <div>
                  from:{" "}
                  <strong>
                    {metaData?.from?.name} &lt;{metaData?.from?.email} &gt;
                  </strong>
                </div>
                <div>
                  details: <strong>{metaData?.subject}</strong>
                </div>
              </section>
              <section className={styles.description}>
                <div>{metaData?.short_description}</div>
              </section>
              <section className={styles.timestamp}>
                <span>{formatDate(metaData?.date, "MM-DD-YYYY")}</span>
                <span>{formatDate(metaData?.date, "hh:mm A")}</span>
              </section>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ListView;
