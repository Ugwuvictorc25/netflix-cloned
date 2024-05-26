import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useGlobalContext } from "./Context";
import { useNavigate } from "react-router";

let endExam = false;

const renderTime = ({ remainingTime }) => {
	const minutes = Math.floor(remainingTime / 60);
	const seconds = remainingTime % 60;
	// const nevigate = useNavigate();

	if (remainingTime === 0) {
		endExam = true;
	}

	return (
		<div className="timer">
			<h3>Remaining Time</h3>
			<h4>{`${minutes > 10 ? minutes : "0" + minutes} : ${seconds > 9 ? seconds : "0" + seconds}`}</h4>
		</div>
	);
};

const Timer = () => {
	const {
		moment: { time: eTime },
	} = useGlobalContext();

	const examTime = +eTime * 60;

	// const count = new Date().setMinutes(new Date().getMinutes() + 1);
	// const [time, setTime] = useState({ min: 1, sec: "00" });
	const navigate = useNavigate();

	if (endExam) {
		navigate("/review");
	}

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		const now = new Date().getTime();
	// 		const calcTime = new Date(count).getTime() - now;

	// 		setTime((prevStat) => {
	// 			if (calcTime > 0) {
	// 				return { min: new Date(calcTime).getMinutes(), sec: new Date(calcTime).getSeconds() };
	// 			} else {
	// 				return { min: "0", sec: "0" };
	// 			}
	// 		});
	// 	}, 1000);

	// 	return () => clearInterval(timer);
	// }, []);
	return (
		<div className="header-cont">
			<div className="timer-wrapper">
				<CountdownCircleTimer isPlaying duration={examTime} colors={["#004777", "#F7B801", "#A30000", "#A30000"]} colorsTime={[10, 6, 3, 0]} onComplete={() => ({ shouldRepeat: false, delay: 1 })}>
					{renderTime}
				</CountdownCircleTimer>
			</div>

			{/* <div className="timer-cont">
				<span>Time </span>
				<span> {`${time.min > 10 ? time.min : "0" + time.min}`} : </span>
				<span>{`${time.sec > 9 ? time.sec : "0" + time.sec}`}</span>
			</div> */}
		</div>
	);
};

export default Timer;
