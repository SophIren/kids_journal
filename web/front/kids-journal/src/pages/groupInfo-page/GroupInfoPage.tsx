import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { GroupInfo } from "../../components/groupInfo/GroupInfo";

type GroupsInfoPageProps = {};

function GroupInfoPage({}: GroupsInfoPageProps): JSX.Element {
  const { organization, groupName, groupId } = useParams();
  return (
    <div>
      <Header />
      <GroupInfo organization={organization} groupName={groupName} groupId={groupId}/>
    </div>
  );
}

export default GroupInfoPage;
