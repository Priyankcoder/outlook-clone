import { useEffect, useState } from "react";
import {
  addEmailIdToLocalStorage,
  deleteEmailIdFromLocalStorage,
  fetchData,
  formatDate,
  readFromLocalStorage,
  transformToArray,
  writeToLocalStorage
} from "../../utils/helperFunctions";
import styles from "./emailView.module.scss";

import { EmailMetaData, QUERY_PARAMS } from "../../utils/interface";

export interface IEmailView {
  emailId: string | null;
  emailData: EmailMetaData[];
  activeEmailData: EmailMetaData;
}

const EmailView = (props: IEmailView) => {
  const { emailId, activeEmailData } = props;
  const [emailDetails, setEmailDetails] = useState("");
  const [favourite, setFavourite] = useState(false);

  const handleFavouriteClick = () => {
    if (favourite) {
      deleteEmailIdFromLocalStorage("favourite", emailId);
    } else {
      addEmailIdToLocalStorage("favourite", emailId);
    }
    setFavourite(!favourite);
  };

  useEffect(() => {
    if (emailId === null) return;
    fetchData(emailId).then((data) => {
      setEmailDetails(data.body);
    });
    if (emailId) {
      addEmailIdToLocalStorage("read", emailId);
    }
    const favouriteEmailsId = transformToArray(
      readFromLocalStorage("favourite") || {}
    );
    const markedFavourite = favouriteEmailsId.includes(emailId);
    setFavourite(markedFavourite);
  }, [emailId]);

  if (emailId === null || Object.keys(activeEmailData).length === 0) {
    return <></>;
  }

  return (
    <div className={styles.emailContainer}>
      <span className={styles.avatar}>{activeEmailData?.from?.name?.[0]}</span>
      <div className={styles.emailContent}>
        <div className={styles.emailHeader}>
          <section className={styles.timestamp}>
            <div className={styles.name}>{activeEmailData?.from?.name}</div>
            <span>{formatDate(activeEmailData?.date, "MM-DD-YYYY")}</span>
            <span>{formatDate(activeEmailData?.date, "hh:mm A")}</span>
          </section>
          <div className={styles.favorite} onClick={handleFavouriteClick}>
            {favourite ? "favorite" : "Mark as favorite"}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: emailDetails }}></div>
      </div>
    </div>
  );
};

export default EmailView;
