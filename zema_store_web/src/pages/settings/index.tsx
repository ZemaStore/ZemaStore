import BaseLayout from "../../common/Layout";
import ChangeProfile from "../../components/ChangeProfile/ChangeProfile";

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <BaseLayout>
      <ChangeProfile />
    </BaseLayout>
  );
};

export default SettingsPage;
