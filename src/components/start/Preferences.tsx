import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { usePreferences } from "../../context/PreferencesContext";

type FormType = {
  name: string;
  gender: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
};

export const Preferences = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const { setUserName, setUserGender } = usePreferences();
  const { showMessage } = useLibrary();

  const clickHandler = () => {
    if (name && gender) {
      setUserName(name);
      setUserGender(gender);
      setTimeout(() => navigate("/home"), 500);
    } else {
      showMessage(false, "Fields Not Completed");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("userName")) {
      navigate("/home");
    }
  });

  return (
    <div>
      <div>
        <img src="/logo.svg" alt="logo" />
      </div>

      <div className="mt-32 flex flex-col items-center">
        <p className="mb-20 text-center font-bold text-lg">
          Select Your Preferences
        </p>
        <Form
          name={name}
          gender={gender}
          setName={setName}
          setGender={setGender}
        />

        <button
          onClick={clickHandler}
          className="mt-14 py-5 w-1/2 bg-offWhite rounded-2xl font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const Form = ({ name, gender, setName, setGender }: FormType) => {
  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex space-x-6">
        <div>
          <input
            className="hidden"
            type="radio"
            id="male"
            name="gender"
            onChange={() => setGender("male")}
          />
          <label
            htmlFor="male"
            className="block bg-[#e1e1e1] bg-[url(/male.png)] bg-contain bg-no-repeat bg-top w-24 h-24 rounded-full cursor-pointer duration-300"
            style={{
              borderBottom: gender === "male" ? "3px solid #28353c" : "",
            }}
          ></label>
        </div>
        <div>
          <input
            className="hidden"
            type="radio"
            id="female"
            name="gender"
            onChange={() => setGender("female")}
          />
          <label
            htmlFor="female"
            className="block bg-[#e1e1e1] bg-[url(/female.png)] bg-contain bg-no-repeat bg-top w-24 h-24 rounded-full cursor-pointer duration-300"
            style={{
              borderBottom: gender === "female" ? "3px solid #28353c" : "",
            }}
          ></label>
        </div>
      </div>

      <div className="text-center space-y-2">
        <label htmlFor="name" className="block font-medium">
          User Name
        </label>
        <input
          className="p-4 w-80 border rounded-md"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
};
