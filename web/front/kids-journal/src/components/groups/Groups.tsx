import React, { useEffect, useState } from "react";
import {ApiRoute, AppRoute, testOrganization} from "../../const";
import { ButtonMain } from "../button/ButtonMain";
import "./Groups.css";
import {Link, useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getAllData } from "../../features/groupsSlice";
import { LoaderScreen } from "../../pages/loading-screen/LoaderScreen";

export type GroupProps = {
  organization: string | undefined;
};

export const Groups = ({ organization }: GroupProps) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => {
    return state.groups;
  });

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const handleDelete = async (group_id: string) => {
    await fetch(`${ApiRoute}/groups/${group_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };
  const navigate = useNavigate();
  const handleEdit = async (group_id: string) => {
    navigate(`/${testOrganization}${AppRoute.EditGroups}/${group_id}`)
  };

  // const [firstGroups, setFirstGroups] = useState(groupInfo);
  // useEffect(() => {
  //
  //   fetch(`${ApiRoute}/organizations/${testOrganization}/groups`, {
  //     method: "GET",
  //     headers: { Accept: "application/json" },
  //   })
  //     .then((response) => {
  //       if (response.status === 200 || response.status === 201) {
  //         return response;
  //       }
  //       throw new Error();
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFirstGroups(data);
  //     });
  // }, []);

  const filteredGroups = data.groups.filter((group) => {
    return group.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <div className="groups__container">
        <div className="groups__from">
          <form className="groups_search-form">
            <input
              type="text"
              placeholder="Введите название группы"
              className="groups_search-input"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setValue(event.currentTarget.value)
              }
            />
          </form>
        </div>
        <div className="groups__label">
          <svg
            width="44"
            height="33"
            viewBox="0 0 44 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6.80851"
              cy="6.80851"
              r="6.80851"
              transform="matrix(-1 0 0 1 29.234 2)"
              stroke="black"
              stroke-width="3"
            />
            <path
              d="M10.5106 25.7188C10.5106 24.2544 11.4312 22.948 12.8103 22.4555V22.4555C19.0281 20.2348 25.8229 20.2348 32.0407 22.4555V22.4555C33.4198 22.948 34.3404 24.2544 34.3404 25.7188V27.958C34.3404 29.9791 32.5503 31.5317 30.5494 31.2459L29.8823 31.1506C24.9362 30.444 19.9148 30.444 14.9687 31.1506L14.3016 31.2459C12.3008 31.5317 10.5106 29.9791 10.5106 27.958V25.7188Z"
              stroke="black"
              stroke-width="3"
            />
            <path
              d="M32.6382 15.8053C35.5927 15.8053 37.9878 13.4102 37.9878 10.4557C37.9878 7.50127 35.5927 5.1062 32.6382 5.1062"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M38.4973 28.0101L39.0214 28.085C40.5935 28.3096 42.0001 27.0897 42.0001 25.5016V23.7423C42.0001 22.5917 41.2767 21.5652 40.1931 21.1782C39.1122 20.7922 38.0091 20.4916 36.8937 20.2764"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M11.3618 15.8053C8.40728 15.8053 6.01221 13.4102 6.01221 10.4557C6.01221 7.50127 8.40728 5.1062 11.3618 5.1062"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M5.50273 28.0101L4.97858 28.085C3.40648 28.3096 1.99994 27.0897 1.99994 25.5016V23.7423C1.99994 22.5917 2.72327 21.5652 3.80687 21.1782C4.88777 20.7922 5.99086 20.4916 7.10632 20.2764"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
          Список групп
        </div>
        <div>
          <ButtonMain
            height="40px"
            width="176px"
            linkButton={`/${organization}${AppRoute.CreateGroups}`}
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
            Создать группу
          </ButtonMain>
        </div>
      </div>

      <div className="groups">
        <table className="groups__table">
          <thead className="groups-title">
            <tr>
              <td className="groups-title_label">Группа</td>
              <td className="groups-title_age">Возраст</td>
              <td className="groups-title_teach">Воспитатель</td>
              <td className="groups-item_icon"></td>
              <td className="groups-item_icon"></td>
              <td className="groups-item_icon"></td>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group, index) => (
              <tr className="groups-item">
                <td className="groups-item_label">
                  <Link to={`/${organization}/${group.name}/${group.group_id}`}>
                    {group.name}
                  </Link>
                </td>
                <td className="groups-item_age">{group.age_range}</td>
                <td className="groups-item_teach">-</td>
                <td className="groups-item_icon">
                  <button
                    className="groups-item_icon-edit"
                    onClick={() => handleEdit(group.group_id)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.32352 14.3551C3.36817 14.3551 3.41281 14.3506 3.45745 14.3439L7.21192 13.6854C7.25656 13.6765 7.29897 13.6564 7.33022 13.6229L16.7923 4.16085C16.813 4.1402 16.8294 4.11568 16.8406 4.08867C16.8518 4.06167 16.8576 4.03272 16.8576 4.00349C16.8576 3.97425 16.8518 3.94531 16.8406 3.9183C16.8294 3.8913 16.813 3.86677 16.7923 3.84612L13.0825 0.134068C13.04 0.0916574 12.9842 0.0693359 12.924 0.0693359C12.8637 0.0693359 12.8079 0.0916574 12.7655 0.134068L3.30343 9.59612C3.26995 9.62961 3.24986 9.66978 3.24093 9.71443L2.58245 13.4689C2.56074 13.5885 2.56849 13.7115 2.60506 13.8274C2.64162 13.9433 2.70588 14.0486 2.79227 14.1341C2.93959 14.2769 3.12486 14.3551 3.32352 14.3551V14.3551ZM4.82799 10.4622L12.924 2.36844L14.5601 4.0046L6.46415 12.0984L4.47977 12.4488L4.82799 10.4622V10.4622ZM17.2142 16.2301H0.785575C0.390486 16.2301 0.0712891 16.5493 0.0712891 16.9443V17.7479C0.0712891 17.8461 0.151646 17.9265 0.249861 17.9265H17.7499C17.8481 17.9265 17.9284 17.8461 17.9284 17.7479V16.9443C17.9284 16.5493 17.6092 16.2301 17.2142 16.2301Z"
                        fill="black"
                        fill-opacity="0.85"
                      />
                    </svg>
                  </button>
                </td>
                <td className="groups-item_icon">
                  <button
                    className="groups-item_icon-delete"
                    onClick={() => handleDelete(group.group_id)}
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
