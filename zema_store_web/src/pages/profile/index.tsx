import BaseLayout from "../../common/Layout";
import SigninComponent from "../../components/Auth/Signin";
import ChangeProfile from "../../components/ChangeProfile/ChangeProfile";

type Props = {};

const UserProfilePage = (props: Props) => {
  return (
    <BaseLayout>
      <ChangeProfile />
    </BaseLayout>
  );
};

export default UserProfilePage;
