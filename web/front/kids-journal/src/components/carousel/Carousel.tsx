import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

import Slider from "react-slick";
import React, { useEffect, useState } from "react";

import { ApiRoute, infoGroups, testOrganization } from "../../const";
import { Link } from "react-router-dom";
import { ModalActive } from "../modalActive/ModalActive";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchGroupsAction } from "../../store/api-actions";
import { store } from "../../store";
import { getAllData } from "../../features/groupsSlice";
import { LoaderScreen } from "../../pages/loading-screen/LoaderScreen";
import { ButtonMain } from "../button/ButtonMain";

export type CarouselProps = {
  organization: string | undefined;
  currentDate: Date;
};

export const groupInfo = [
  {
    group_id: "",
    organization_id: "",
    name: "",
    age_range: "",
  },
];

type lessonInfoProps = [
  {
    schedule_id: string;
    presentation_id: string;
    presentation_name: string;
    child_ids: string[];
    start_lesson: string;
    is_for_child: boolean;
  },
];

export const lessonInfo: lessonInfoProps = [
  {
    schedule_id: "",
    presentation_id: "",
    presentation_name: "",
    child_ids: [""],
    start_lesson: "",
    is_for_child: false,
  },
];

export const Carousel = ({ organization, currentDate }: CarouselProps) => {
  const [carousels, setCarousels] = useState(infoGroups);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [currentActivity, setCurrentActivity] = useState(lessonInfo);
  const [currentGroup, setCurrentGroup] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState("");

  const currentCarousel = carousels.filter((carousel) => {
    if (organization !== undefined)
      return carousel.organization
        .toLowerCase()
        .includes(organization.toLowerCase());
    return {};
  });

  const [allInfo, setAllInfo] = useState<
    { group: string; lessons: lessonInfoProps }[]
  >([]);

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => {
    return state.groups;
  });

  const groups = data.groups;

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  useEffect(() => {
    setAllInfo([]);
  }, [currentDate]);

  useEffect(() => {
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].group_id !== "") {
        fetch(
          `${ApiRoute}/lessons/${groups[i].group_id}?date_day=${resultData}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          },
        )
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              return response;
            }
            throw new Error();
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.length !== 0)
              setAllInfo((allInfo) => [
                ...allInfo,
                { group: groups[i].group_id, lessons: data },
              ]);
          });
      }
    }
  }, [groups, currentDate]);

  // const [groups, setGroups] = useState(groupInfo);
  // useEffect(() => {
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
  //       setGroups(data);
  //     });
  // }, []);

  console.log("allInfo", allInfo);

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedDate = formatter.format(currentDate);
  let dataArr = formattedDate.split("/");
  const resultData = dataArr[2] + "-" + dataArr[0] + "-" + dataArr[1];

  let slidesToShowCurrent = 3;
  if (groups.length === 1) slidesToShowCurrent = 1;
  else if (groups.length === 2) slidesToShowCurrent = 2;

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowCurrent,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShowCurrent === 1 ? 1 : slidesToShowCurrent - 1,
          slidesToScroll:
            slidesToShowCurrent === 1 ? 1 : slidesToShowCurrent - 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const formatData = currentDate.toLocaleDateString();

  const doDo = (action: lessonInfoProps, group: string, group_id: string) => {
    setCurrentActivity(action);
    setCurrentGroup(group);
    setCurrentGroupId(group_id);
  };

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const [valuePresentation, getPresentation] = useState();

  const getCurrentLesson = (lesson: string) => {
    console.log("lesson", lesson);
    fetch(`${ApiRoute}/organizations/${testOrganization}/subject//${lesson}`, {
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
        if (data.length !== 0) getPresentation(data);
      });
    return valuePresentation;
  };

  return (
    <>
      <div className="carousel">
        <Slider {...settings}>
          {groups.map((group) => (
            <div className="carousel_box">
              <div className="carousel_box-title">
                <div className="carousel_box-name">Группа {group.name}</div>
                <div className="carousel_box-age">{group.age_range}</div>
              </div>
              <div className="carousel_box-schedule">
                {allInfo.filter((el) => {
                  return el.group === group.group_id;
                }).length !== 0 && (
                  <div className="carousel_box-content">
                    {allInfo
                      .filter((el) => {
                        return el.group === group.group_id;
                      })
                      .map((action) =>
                        action.lessons.map((lesson) => {
                          // const currentLesson = getCurrentLesson(
                          //   lesson.presentation_id,
                          // );
                          return (
                            <Link
                              className="carousel_box-container"
                              to={""}
                              onClick={handleModalOpen}
                            >
                              <div
                                onClick={() =>
                                  doDo([lesson], group.name, group.group_id)
                                }
                                className={`carousel_box-action ${
                                  lesson.is_for_child ? "isOrange" : "isGreen"
                                }`}
                              >
                                <div className="carousel_action-info">
                                  <div className="carousel_action-topic">
                                    {lesson.presentation_id}
                                  </div>
                                  <div className="carousel_action-time">
                                    {lesson.start_lesson
                                      .split("T")[1]
                                      ?.split(":")
                                      .slice(0, -1)
                                      .join(":")}
                                  </div>
                                </div>
                                <div className="carousel_action-children">
                                  {lesson.is_for_child &&
                                    `Дети: ${lesson.child_ids[0]} ${
                                      lesson.child_ids.length > 1
                                        ? `и еще ${lesson.child_ids.length - 1}`
                                        : ""
                                    }`}
                                </div>
                              </div>
                            </Link>
                          );
                        }),
                      )}
                  </div>
                )}
              </div>
              <div className="carousel_box-button">
                <ButtonMain
                  height="40px"
                  width="250px"
                  linkButton={``}
                  background="white"
                  borderColor="#FFBF85"
                  color="#A65000"
                >
                  Выставить посещаемость
                  <svg
                    width="18"
                    height="10"
                    viewBox="0 0 18 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7071 9L16 5.70711C16.3905 5.31658 16.3905 4.68342 16 4.29289L12.7071 1M15.7071 5L1.70712 5"
                      stroke="#A65000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </ButtonMain>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <ModalActive
        isOpen={isOpenModal}
        onCloseModal={handleModalClose}
        currentActivity={currentActivity}
        currentGroup={currentGroup}
        currentGroupId={currentGroupId}
      />
    </>
  );
};
