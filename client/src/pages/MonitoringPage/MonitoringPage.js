import {OnlineGraph} from "../OnlineGraph/OnlineGraph";
import './MonitoringPage.css';
import MapItem from '../../components/map-item/MapItem';

export const MonitoringPage = () => {

    return (
        <div className={"online-monitoring"}>
            <div className={"online-monitoring-wrap"}>
                <OnlineGraph url={"/api/monitoring/last3s"}
                             fieldName={"pulse"}
                             id={"chart1"}
                             header={"Пульс"}
                             paddingRight={20} />
                <OnlineGraph url={"/api/monitoring/last3s"}
                             fieldName={"aox"}
                             id={"chart2"}
                             header={"Ускорение oX"}
                             paddingRight={20} />
                <OnlineGraph url={"/api/monitoring/last3s"}
                             fieldName={"aoy"}
                             id={"chart3"}
                             header={"Ускорение oY"}
                             paddingRight={20} />
                <OnlineGraph url={"/api/monitoring/last3s"}
                             fieldName={"aoz"}
                             id={"chart4"}
                             header={"Ускорение oZ"}
                             paddingRight={20} />
            </div>
            <MapItem label={"Игрок-1"} />
        </div>
    )
}