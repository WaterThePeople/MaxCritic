import React from "react";
import style from "./Email.module.sass";
import LoadingCard from "components/LoadingCard/LoadingCard";
import Input from "components/Input/Input";

function Email({
  loading,
  email,
  setEmail,
}: {
  loading: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<any>>;
}) {
  return loading ? (
    <LoadingCard classname={style.loading} />
  ) : (
    <div className={style.container}>
      <Input
        value={email ? email : ""}
        setValue={setEmail}
        label="Your Email"
        readOnly={true}
        disabled={true}
      />
    </div>
  );
}

export default Email;
