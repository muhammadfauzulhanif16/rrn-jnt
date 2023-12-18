import { DashboardLayout } from "@/Layouts/DashboardLayout";

const Profile = ({ auth }: any) => {
    return <DashboardLayout title="Profil" auth={auth}>Profile</DashboardLayout>;
};

export default Profile;
