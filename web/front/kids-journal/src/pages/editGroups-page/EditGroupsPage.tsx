import React from "react";
import { Header } from "../../components/header/Header";
import { CreateGroups } from "../../components/createGroups/CreateGroups";
import { useParams } from "react-router-dom";
import { EditGroups } from "../../components/EditGroups/EditGroups";

type CreateGroupsPageProps = {};

function EditGroupsPage({}: CreateGroupsPageProps): JSX.Element {
  const { organization } = useParams();
  return (
    <div>
      <Header />
      <EditGroups organization={organization} />
    </div>
  );
}

export default EditGroupsPage;
