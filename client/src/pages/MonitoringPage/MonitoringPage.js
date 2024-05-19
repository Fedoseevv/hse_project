import {OnlineGraph} from "../OnlineGraph/OnlineGraph";
import {MapItem} from "../../components/map-item/MapItem";
import './MonitoringPage.css';

export const MonitoringPage = ({ deviceId }) => {

    return (
        <div className={"online-monitoring"}>
            <div className="online-monitoring-header">Онлайн показатели спортсмена</div>
            <div className={"online-monitoring-wrap"}>
                <OnlineGraph url={`/api/monitoring/last3s/${deviceId}`}
                             fieldName={"pulse"}
                             deviceId={deviceId}
                             id={"chart1"}
                             header={"Пульс"}
                             paddingRight={20} />
                <OnlineGraph url={`/api/monitoring/last3s/${deviceId}`}
                             fieldName={"aox"}
                             id={"chart2"}
                             deviceId={deviceId}
                             header={"Ускорение oX"}
                             paddingRight={20} />
                <OnlineGraph url={`/api/monitoring/last3s/${deviceId}`}
                             fieldName={"aoy"}
                             id={"chart3"}
                             deviceId={deviceId}
                             header={"Ускорение oY"}
                             paddingRight={20} />
                <OnlineGraph url={`/api/monitoring/last3s/${deviceId}`}
                             fieldName={"aoz"}
                             id={"chart4"}
                             deviceId={deviceId}
                             header={"Ускорение oZ"}
                             paddingRight={20} />
            </div>
            <MapItem deviceId={deviceId} label={"Игрок-1"} />
        </div>
    )
}