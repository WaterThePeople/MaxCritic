import style from "./User.module.sass";
import Image from "components/Image/Image";
import cn from "classnames";
import DefaultLink from "components/DefaultLink/DefaultLink";

function User({
  user,
  classname,
  href,
}: {
  user: any;
  classname?: any;
  href?: string;
}) {
  return (
    <DefaultLink className={cn(style.user, classname)} to={href ? href : ""}>
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
    </DefaultLink>
  );
}

export default User;
