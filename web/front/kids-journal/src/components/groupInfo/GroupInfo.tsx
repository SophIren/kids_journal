import React, { MouseEventHandler, useEffect, useState } from "react";
import { ButtonMain } from "../button/ButtonMain";
import { ApiRoute, AppRoute, infoGroups, testOrganization } from "../../const";
import { Link } from "react-router-dom";

import "./GroupInfo.css";
import { Modal } from "../modal/Modal";

export type GroupInfoProps = {
  groupId: string | undefined;
  groupName: string | undefined;
  organization: string | undefined;
};

export type ParentProps = {
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  tg_user_id: string;
  user_id: string;
};

export const parent = {
  email: "",
  first_name: "",
  gender: "",
  last_name: "",
  middle_name: "",
  phone_number: "",
  tg_user_id: "",
  user_id: "",
};

export const child = {
  child_id: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  birth_date: "",
  start_education_date: "",
  end_education_date: "",
  gender: "",
  avatar_url: "",
};

export const GroupInfo = ({
  organization,
  groupName,
  groupId,
}: GroupInfoProps) => {
  const [children, setChildren] = useState([child]);
  const [parents, setParents] = useState([parent]);
  useEffect(() => {
    fetch(`${ApiRoute}/${groupId}/child`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        throw new Error();
      })
      .then((response) => response.json())
      .then((data) => {
        setChildren(data);
      });
  }, []);
  const [groups, setGroups] = useState(infoGroups);

  const curParent = (currChild: string) => {
    fetch(`${ApiRoute}/parents/child/${currChild}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        throw new Error();
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setParents(data);
      });
  };

  const currentGroup = groups.filter((group) => {
    if (groupId !== undefined)
      return group.carouselLabel.toLowerCase().includes(groupId.toLowerCase());
    return {};
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [currChild, setCurrChild] = useState<
    [string, ParentProps, ParentProps]
  >(["", parent, parent]);

  const doDo = (name: string, parent_1: ParentProps, parent_2: ParentProps) => {
    setCurrChild([name, parent_1, parent_2]);
  };

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const handleDelete = async (child_id: string) => {
    await fetch(`${ApiRoute}/children/${child_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <div className="group_title">
        <div className="group_name">Группа {groupName}</div>
        <div>
          <ButtonMain
            height="40px"
            width="224px"
            linkButton={`/${organization}/${groupName}/${groupId}${AppRoute.AddChild}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7L13 7"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 1L7 13"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Редактировать группу
          </ButtonMain>
        </div>
      </div>

      <div className="children">
        <table className="children__table">
          <thead className="children-title">
            <tr>
              <td className="children-title_name">Имя</td>
              <td className="children-title_age">Возраст</td>
              <td className="children-phone_number">Контакт родителей</td>
              <td className="children-parent">Имя родителя</td>
              <td className="groups-item_icon"></td>
              <td className="groups-item_icon"></td>
            </tr>
          </thead>
          <tbody>
            {children?.map((child) => {
              curParent(child.child_id);
              return (
                <>
                  <tr
                    className="children-item"
                    onClick={() =>
                      doDo(child.first_name, parents[0], parents[1])
                    }
                  >
                    <td className="children-item_name">
                      <Link
                        to={`/${testOrganization}/${groupId}/${child.child_id}/profile`}
                        onClick={handleModalOpen}
                      >
                        {child.first_name + " " + child.last_name}
                      </Link>
                    </td>
                    <td className="children-item_age">
                      {new Date().getFullYear() -
                        new Date(child.birth_date).getFullYear()}
                    </td>
                    <td className="children-item_number">
                      {parents !== null ? parents[0].phone_number : ""}
                    </td>
                    <td className="children-item_parent">
                      {parents !== null ? parents[0].first_name + " " + parents[0].last_name : ""}
                    </td>
                    <td className="groups-item_icon">
                      <button
                        className="groups-item_icon-delete"
                        onClick={() => handleDelete(child.child_id)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.60679 1.67648H5.42822C5.52644 1.67648 5.60679 1.59612 5.60679 1.49791V1.67648H12.3925V1.49791C12.3925 1.59612 12.4729 1.67648 12.5711 1.67648H12.3925V3.28362H13.9997V1.49791C13.9997 0.709961 13.359 0.0693359 12.5711 0.0693359H5.42822C4.64028 0.0693359 3.99965 0.709961 3.99965 1.49791V3.28362H5.60679V1.67648ZM16.8568 3.28362H1.14251C0.747419 3.28362 0.428223 3.60282 0.428223 3.99791V4.71219C0.428223 4.81041 0.50858 4.89077 0.606794 4.89077H1.95501L2.50635 16.5649C2.54206 17.326 3.17153 17.9265 3.93269 17.9265H14.0666C14.83 17.9265 15.4572 17.3283 15.493 16.5649L16.0443 4.89077H17.3925C17.4907 4.89077 17.5711 4.81041 17.5711 4.71219V3.99791C17.5711 3.60282 17.2519 3.28362 16.8568 3.28362ZM13.8947 16.3193H4.10456L3.56438 4.89077H14.4349L13.8947 16.3193Z"
                            fill="black"
                            fill-opacity="0.85"
                          />
                        </svg>
                      </button>
                    </td>
                    <td></td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isOpenModal}
        onCloseModal={handleModalClose}
        groupId={groupId}
        currChild={currChild}
      />
    </>
  );
};
