import { FormWrapperEdit } from "./FormWrapperEdit";
import { Checkbox, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { ApiRoute, testOrganization } from "../../const";
import { useParams } from "react-router-dom";
import { childInfo, groupInfo } from "../userForm/UserForm";

type UserData = {
  group: string;
  isIndividual: boolean;
  listChildren: [];
  date: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export function UserFormEdit({
  group,
  isIndividual,
  listChildren,
  date,
  updateFields,
}: UserFormProps) {
  const [groups, setGroups] = useState(groupInfo);
  const [curGroup, setCurGroup] = useState(group);

  useEffect(() => {
    fetch(`${ApiRoute}/organizations/${testOrganization}/groups`, {
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
        setGroups(data);
      });
  }, []);

  useEffect(() => {
    setCurGroup(group);
  }, [groups]);

  console.log("date", date, "1");

  const handleGroupsName = (e: string) => {
    return groups[Number(e)].name;
  };

  const [chilgren, setChilgren] = useState(childInfo);

  useEffect(() => {
    if (curGroup !== "") {
      fetch(`${ApiRoute}/${curGroup}/child`, {
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
          setChilgren(data);
        });
    }
  }, [curGroup]);

  return (
    <FormWrapperEdit>
      <label>Группа</label>
      <Select
        required
        onClick={(e) => setCurGroup(handleGroupsName(e.currentTarget.value))}
        onChange={(e) =>
          updateFields({ group: handleGroupsName(e.target.value) })
        }
        style={{
          background: "white",
        }}
        variant="filled"
        value={curGroup}
      >
        {groups.map((groupCur, index) => {
          return <option value={groupCur.name}>{groupCur.name}</option>;
        })}
      </Select>
      <label>Дата</label>
      <Input
        required
        type="datetime-local"
        name={date}
        value={date}
        variant="filled"
        defaultValue={date}
        onChange={(e) => updateFields({ date: e.target.value })}
        style={{
          background: "white",
        }}
      />
      <input
        type="checkbox"
        checked={isIndividual}
        onChange={(e) =>
          updateFields({ isIndividual: e.currentTarget.checked })
        }
      />
      Индивидуальное задание
      {isIndividual && (
        <>
          <label>Дети</label>
          <Multiselect
            options={chilgren.map((child, index) => ({
              name: child.child_id,
              id: index,
            }))}
            displayValue="name"
            placeholder="Выберите ребенка"
            selectedValues={listChildren}
            onSelect={(e) => updateFields({ listChildren: e })}
            onRemove={(e) => updateFields({ listChildren: e })}
          />
        </>
      )}
    </FormWrapperEdit>
  );
}
