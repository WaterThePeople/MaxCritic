import style from "./User.module.sass";
import Image from "components/Image/Image";
import cn from "classnames";

function User({ user, classname }: { user: any; classname?: any }) {
  return (
    <div className={cn(style.user, classname)}>
      {user?.image ? (
        <Image image={user?.image} classname={style.user_image} />
      ) : (
        <img
          src={process.env.PUBLIC_URL + "../assets/default_avatar.png"}
          alt="Avatar"
          className={style.user_image}
        />
      )}

      <div className={style.user_text}>{user?.username}</div>
    </div>
  );
}

export default User;
