import './PersonStat.css';
import {useParams} from "react-router-dom";
import {MonitoringPage} from "../../../pages/MonitoringPage/MonitoringPage";

export const PersonStat = () => {
    const { id } = useParams();

    return <MonitoringPage deviceId={id} />
}