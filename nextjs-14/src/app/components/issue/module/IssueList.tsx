import React, { useEffect, useState } from "react";
import { API } from "@/app/components/common/enums/API";
import { ISse } from "../model/issue";

const IssueList: React.FC = () => {
  const [issues, setIssues] = useState<ISse[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${API.SERVER}/issues/sse`);

    eventSource.onmessage = (event) => {
      const newIssue = JSON.parse(event.data);
      
      setIssues((prevIssues) => [newIssue, ...prevIssues]);
    };

    eventSource.onerror = (error) => {
      console.error("Error occurred:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div id="events" className="m-10">
        <h2>알림</h2>
        {issues.length === 0 ? (
          <p>No Notifications</p>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className="bubble-text">
              <h2 className="bubble get">{issue.title}</h2>
              <p className="bubble get">{issue.content}</p>
              <p className="bubble get">{issue.law}</p>
              <p className="bubble get">{issue.attachment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IssueList;
