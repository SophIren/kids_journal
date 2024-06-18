import React from "react";
import { Header } from "../../components/header/Header";
import {AddChild} from "../../components/addChild/AddChild";
import {useParams} from "react-router-dom";

type AddChildPageProps = {};

function AddChildPage({}: AddChildPageProps): JSX.Element {
    const { organization, groupName, groupId } = useParams();
    return (
        <div>
            <Header />
            <AddChild organization={organization} groupName={groupName} groupId={groupId}/>
        </div>
    );
}

export default AddChildPage;
