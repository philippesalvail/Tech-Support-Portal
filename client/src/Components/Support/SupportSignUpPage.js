import React from "react";
import styled from "styled-components";
import Loading from "../Loading";
import {SupportSignUp} from "./SupportFunctions";
import {useHistory} from "react-router-dom";

function SupportSignUpPage() {
  let history = useHistory();
  const [teams, setTeams] = React.useState(null);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [teamSelected, setTeamSelected] = React.useState(null);

  const signUpHandler = (e) => {
    e.preventDefault();
    let error = "";
    if (firstName.length < 2) {
      error += "Please enter valid first name" + "\n";
    }
    if (lastName.length < 2) {
      error += "Please enter valid last name" + "\n";
    }
    if (!teamSelected) {
      error += "Please enter team";
    }

    // error += firstName.length < 2 ? "Please enter valid first name" + "\n" : "";
    // error += lastName.length < 2 ? "Please enter valid last name" + "\n" : "";
    // error += teamSelected ? "" : "Please enter team";
    if (error !== "") {
      alert(error);
    } else {
      SupportSignUp({
        firstname: firstName,
        lastname: lastName,
        supportteam: teamSelected,
      });
      alert(
        "Request account for " +
          firstName +
          " " +
          lastName +
          " was submitted successfully"
      );
      history.push("/");
    }
  };

  React.useEffect(() => {
    fetch("/support/supportteams/getSupportTeams")
      .then((response) => response.json())
      .then((supportTeams) => setTeams(supportTeams.teams))
      .catch((error) => console.log("error: ", error.message));
  }, []);

  if (teams) {
    console.log("teams in SupportSignUpPage: ", teams);
  }
  return (
    <>
      {teams ? (
        <SignUp>
          <SupportBanner>Sign Up</SupportBanner>
          <SignUpPage onSubmit={signUpHandler}>
            <FirstName>
              <FirstNameLbl>First Name: </FirstNameLbl>
              <FirstNameTxt onChange={(e) => setFirstName(e.target.value)} />
            </FirstName>
            <LastName>
              <LastNameLbl>Last Name:</LastNameLbl>
              <LastNameTxt onChange={(e) => setLastName(e.target.value)} />
            </LastName>
            <SupportTeam>
              <SupportTeamLbl>Support Team: </SupportTeamLbl>
              <DropDownSelect
                id="assignmentGroup"
                name="assignmentGroup"
                defaultValue="selectAssignmentGroup"
                onChange={(e) => setTeamSelected(e.target.value)}
              >
                <option value="selectAssignmentGroup" disabled hidden>
                  Select Assignment Group
                </option>
                {teams.map((team, index) => {
                  return (
                    <option key={team + index} value={team.supportName}>
                      {team.supportName}
                    </option>
                  );
                })}
              </DropDownSelect>
            </SupportTeam>
            <ButtonRow>
              <CancelBtn
                onClick={() => {
                  history.push("/");
                }}
              >
                Cancel
              </CancelBtn>
              <SubmitBtn type="submit">Sign Up</SubmitBtn>
            </ButtonRow>
          </SignUpPage>
        </SignUp>
      ) : (
        <Loading />
      )}
    </>
  );
}
const ErrorDisplayed = styled.div`
  min-height: 25vh;
`;

const SignUp = styled.div`
  width: 35%;
  margin: 0 auto;
`;

const ButtonRow = styled.div`
  margin-top: 5%;
  display: inline-flex;
  justify-content: flex-end;
  flex-basis: 25px;
  gap: 12px;
`;

const SubmitBtn = styled.button``;
const CancelBtn = styled.button``;

const SignUpPage = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 5%;
  border-radius: 25px;
`;
const SupportBanner = styled.div`
  text-align: center;
  margin: 2%;
  color: blue;
  font-size: 1.75em;
`;

const FirstName = styled.div`
  display: flex;
  margin-bottom: 4%;
`;
const FirstNameLbl = styled.label`
  flex: 1;
`;
const FirstNameTxt = styled.input`
  flex: 1;
`;

const LastName = styled.div`
  display: flex;
  margin-bottom: 4%;
`;

const LastNameLbl = styled.label`
  flex: 1;
`;
const LastNameTxt = styled.input`
  flex: 1;
`;
const SupportTeam = styled.div`
  display: flex;
`;
const SupportTeamLbl = styled.label`
  flex: 1;
`;
const DropDownSelect = styled.select`
  flex: 1;
`;

export default SupportSignUpPage;
