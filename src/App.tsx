import "./styles.css";
import styles from "./app.module.scss";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Filter from "./component/filter/Filter";
import ListView from "./component/listView/ListView";
import EmailView from "./component/emailView/EmailView";

import {
  EmailList,
  EmailMetaData,
  FILTERS,
  QUERY_PARAMS
} from "./utils/interface";
import { fetchData } from "./utils/helperFunctions";

export default function App() {
  const [searchParam] = useSearchParams();
  const [emailListData, setEmailListData] = useState<EmailList | []>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeEmailData, setActiveEmailData] = useState<EmailMetaData | {}>(
    {}
  );
  const [emailId, setEmailId] = useState<string | null>(null);

  useEffect(() => {
    fetchData().then((data) => {
      console.log(data);
      setEmailListData(data);
    });
  }, []);

  useEffect(() => {
    setActiveFilter(searchParam.get(QUERY_PARAMS["FILTER"]) || FILTERS.UNREAD);
    setEmailId(searchParam.get(QUERY_PARAMS["EMAIL_ID"]));
  }, [searchParam]);

  useEffect(() => {
    const activeEmailId = searchParam.get(QUERY_PARAMS["EMAIL_ID"]);
    const activeEmailData = emailListData?.list?.find(
      (email: EmailMetaData) => email.id === activeEmailId
    );
    console.log("activeEmailData", activeEmailData);
    setActiveEmailData(activeEmailData || {});
  }, [searchParam, emailListData]);

  useEffect(() => {
    console.log("emailListData", emailListData);
  }, []);
  return (
    <div className={styles.app}>
      <Filter activeFilter={activeFilter} />
      <div className={styles.emailContainer}>
        <ListView
          activeFilter={activeFilter}
          emailData={emailListData?.list}
          emailId={emailId}
        />
        <EmailView emailId={emailId} activeEmailData={activeEmailData} />
      </div>
    </div>
  );
}
