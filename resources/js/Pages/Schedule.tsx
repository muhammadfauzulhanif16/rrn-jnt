import { DashboardLayout } from "@/Layouts/DashboardLayout";

const Schedule = ({ title, auth }: any) => {
    return (
        <DashboardLayout title={title} auth={auth}>
            <h1>Schedule</h1>
        </DashboardLayout>
    );
};

export default Schedule;
