import React, { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Grid,
  GridItem,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import "./AddChild.css";
import { ButtonMain } from "../button/ButtonMain";
import { ApiRoute } from "../../const";
import { InputPhone } from "../input-phone/InputPhone";

type Child = {
  firstNameChild: string;
  surnameChild: string;
  dataChild: string;
  firstNameParent: string;
  surnameParent: string;
  telParent: string;
  firstNameParentTWO: string;
  surnameParentTWO: string;
  telParentTWO: string;
};

type addChildrenProps = {
  organization: string | undefined;
  groupId: string | undefined;
  groupName: string | undefined;
};

type Tchild = {
  child_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string;
  start_education_date: string;
  end_education_date: string;
  gender: string;
  avatar_url: string;
};

const child: Tchild = {
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

const parent = {
  user_id: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  email: "",
  gender: "",
  phone_number: "",
  tg_user_id: "",
};

export const AddChild = ({
  organization,
  groupName,
  groupId,
}: addChildrenProps) => {
  const [isButton, setIsButton] = useState(false);

  const childTemplate = {
    firstNameChild: "",
    surnameChild: "",
    dataChild: Date(),
    firstNameParent: "",
    surnameParent: "",
    telParent: "",
    firstNameParentTWO: "",
    surnameParentTWO: "",
    telParentTWO: "",
  };

  const [children, setChildren] = useState([childTemplate]);
  const addChild = () => {
    isButton ? setChildren([...children, childTemplate]) : setIsButton(true);
  };

  const onChangeChild = (
    e: React.FormEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedChildren = children.map((child, i) =>
      index == i
        ? Object.assign(child, {
            [e.currentTarget.name]: e.currentTarget.value,
          })
        : child,
    );
    setChildren(updatedChildren);
  };

  const removeChild = (index: number) => {
    const filteredChildren = [...children];
    filteredChildren.splice(index, 1);
    setChildren(filteredChildren);
  };

  const [value, setValue] = useState("");
  const [valueAge, setValueAge] = useState("");
  const [valueName, setNameInput] = useState("");

  const [valueChildId, setChildId] = useState("");
  const [valueParent1Id, setParent1Id] = useState("");
  const [valueParent2Id, setParent2Id] = useState("");

  const addToGroup = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    for (let i = 0; i < children.length; i++) {
      let child = children[i];

      let body_parent_1 = JSON.stringify({
        first_name: child.firstNameParent,
        last_name: child.surnameParent,
        phone_number: child.telParent,
      });
      let requestOptions1 = {
        method: "POST",
        headers: headers,
        body: body_parent_1,
      };
      fetch(ApiRoute + "/parents", requestOptions1)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response;
          }
          throw new Error();
        })
        .then((response) => response.json())
        .then((data) => {
          setParent1Id(data.user_id);
        });

      let body_parent_2 = JSON.stringify({
        first_name: child.firstNameParentTWO,
        last_name: child.surnameParentTWO,
        phone_number: child.telParentTWO,
      });
      let requestOptions2 = {
        method: "POST",
        headers: headers,
        body: body_parent_2,
      };
      fetch(ApiRoute + "/parents", requestOptions2)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response;
          }
          throw new Error();
        })
        .then((response) => response.json())
        .then((data) => {
          setParent2Id(data.user_id);
        });

      let body_child = JSON.stringify({
        first_name: child.firstNameChild,
        last_name: child.surnameChild,
        birth_date: new Date(child.dataChild),
        start_education_date: "2024-06-17",
        end_education_date: "2025-06-17",
        middle_name: "n",
        gender: "MALE",
        avatar_url: "n",
      });
      let requestOptions3 = {
        method: "POST",
        headers: headers,
        body: body_child,
      };
      fetch(ApiRoute + `/${groupId}/child?group_id=${groupId}`, requestOptions3)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response;
          }
          throw new Error();
        })
        .then((response) => response.json())
        .then((data) => {
          setChildId(data.child_id);
        });
    }
  };

  useEffect(() => {
    console.log("1111111", valueParent1Id, valueParent2Id, valueChildId);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (valueParent1Id !== "" && valueParent2Id !== "" && valueChildId !== "") {
      let requestOptions4 = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({}),
      };

      let requestOptions5 = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({}),
      };

      fetch(
        ApiRoute + `/parents/${valueParent1Id}/child/${valueChildId}`,
        requestOptions4,
      );
      fetch(
        ApiRoute + `/parents/${valueParent2Id}/child/${valueChildId}`,
        requestOptions5,
      );
    }
  }, [valueChildId]);

  return (
    <>
      <div className="creat__text">Список группы</div>
      <div className="creat__form">
        <div className="add_children">
          <div className="childrenScroll">
            {isButton &&
              children?.map((child, index) => (
                <div className="add_children-item">
                  <Grid
                    templateRows="repeat(3, 1fr)"
                    templateColumns="repeat(7, 1fr)"
                    gap={3}
                    key={index + 1}
                  >
                    <GridItem rowSpan={3} colSpan={1} className="Close-Button">
                      <CloseButton onClick={() => removeChild(index)} />
                    </GridItem>
                    <GridItem colSpan={2} w="100%" h="10">
                      <Input
                        isRequired
                        placeholder="Имя ребенка"
                        size="md"
                        name="firstNameChild"
                        onChange={(e) => onChangeChild(e, index)}
                        value={child.firstNameChild}
                      />
                    </GridItem>
                    <GridItem colSpan={2} w="100%" h="10">
                      <Input
                        isRequired
                        placeholder="Фамилия ребенка"
                        size="md"
                        name="surnameChild"
                        onChange={(e) => onChangeChild(e, index)}
                        value={child.surnameChild}
                      />
                    </GridItem>
                    <GridItem colSpan={2} w="100%" h="10">
                      <Input
                        isRequired
                        placeholder="Select Date"
                        size="md"
                        type="date"
                        name="dataChild"
                        onChange={(e) => onChangeChild(e, index)}
                        value={child.dataChild}
                      />
                    </GridItem>

                    <GridItem colSpan={2} w="100%" h="10">
                      <Input
                        isRequired
                        placeholder="Имя родителя"
                        size="md"
                        name="firstNameParent"
                        onChange={(e) => onChangeChild(e, index)}
                        value={child.firstNameParent}
                      />
                    </GridItem>
                    <GridItem colSpan={2} w="100%" h="10">
                      <FormControl isRequired>
                        <Input
                          placeholder="Фамилия родителя"
                          size="md"
                          name="surnameParent"
                          onChange={(e) => onChangeChild(e, index)}
                          value={child.surnameParent}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={2} w="100%" h="10">
                      <InputPhone
                        isRequired
                        placeholder="Номер телефона родителя"
                        size="md"
                        type="tel"
                        name="telParent"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onChangeChild(e, index)
                        }
                        value={child.telParent}
                      />
                    </GridItem>

                    <GridItem colSpan={2} w="100%" h="10">
                      <Input
                        placeholder="Имя родителя"
                        size="md"
                        name="firstNameParentTWO"
                        onChange={(e) => onChangeChild(e, index)}
                        value={child.firstNameParentTWO}
                      />
                    </GridItem>
                    <GridItem colSpan={2} w="100%" h="10">
                      <Input
                        placeholder="Фамилия родителя"
                        size="md"
                        name="surnameParentTWO"
                        onChange={(e) => onChangeChild(e, index)}
                        value={child.surnameParentTWO}
                      />
                    </GridItem>
                    <GridItem colSpan={2} w="100%" h="10">
                      <InputPhone
                        placeholder="Номер телефона родителя"
                        size="md"
                        type="tel"
                        name="telParentTWO"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onChangeChild(e, index)
                        }
                        value={child.telParentTWO}
                      />
                    </GridItem>
                  </Grid>
                </div>
              ))}
          </div>
          <div className="button-addChild">
            <Button
              className="button-addChild"
              colorScheme="orange"
              variant="outline"
              onClick={addChild}
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
              Добавить ребенка
            </Button>
          </div>

          <div className="add_children-in-group__button">
            <ButtonMain
              height="40px"
              width="160px"
              linkButton={``}
              onClick={() => addToGroup()}
            >
              Продолжить
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.707 9L15.9999 5.70711C16.3905 5.31658 16.3905 4.68342 15.9999 4.29289L12.707 1M15.707 5L1.70703 5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </ButtonMain>
          </div>
        </div>
      </div>
    </>
  );
};
