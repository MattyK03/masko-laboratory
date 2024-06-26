import "./Gazeta.scss";

const Gazeta = () => {
	return (
		<div className="container">
			<header>
				<h1>Всемирная история</h1>
			</header>

			<div className="page">
				<div className="article">
					<h2>Древние цивилизации</h2>
					<div className="columns">
						<div className="column">
							<img
								src="ancient_civilization.jpg"
								alt="Древняя цивилизация"
							/>
							<p>
								Древние цивилизации, такие как Египет,
								Месопотамия и Индия, оставили значительный след
								в истории человечества. Их культурные,
								технологические и архитектурные достижения до
								сих пор восхищают исследователей.
							</p>
						</div>
						<div className="column">
							<p>
								Многие из этих цивилизаций развили сложные
								системы письма, такие как иероглифы и клинопись,
								а также создали невероятные памятники
								архитектуры, такие как пирамиды и зиккураты. Их
								знания в области математики, астрономии и
								медицины также впечатляют.
							</p>
						</div>
					</div>
				</div>

				<div className="article">
					<h2>Средневековье</h2>
					<div className="columns">
						<div className="column">
							<img src="medieval.jpg" alt="Средневековье" />
							<p>
								Средневековье, или Средние века, охватывает
								период с V по XV век нашей эры. Этот период
								характеризуется развитием феодализма, крестовыми
								походами и расцветом христианства в Европе.
							</p>
						</div>
						<div className="column">
							<p>
								В это время были построены многие величественные
								соборы, такие как Нотр-Дам де Пари и Кёльнский
								собор. Средневековые ученые и философы, такие
								как Фома Аквинский, также внесли значительный
								вклад в развитие европейской мысли.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="page">
				<div className="article">
					<h2>Эпоха Возрождения</h2>
					<div className="columns">
						<div className="column">
							<img
								src="renaissance.jpg"
								alt="Эпоха Возрождения"
							/>
							<p>
								Эпоха Возрождения, охватывающая период с XIV по
								XVII век, была временем культурного расцвета в
								Европе. Искусство, наука и литература пережили
								новый подъем, и многие известные художники и
								ученые, такие как Леонардо да Винчи и
								Микеланджело, оставили свой след в истории.
							</p>
						</div>
						<div className="column">
							<p>
								Эта эпоха также знаменует собой начало эпохи
								великих географических открытий, когда
								европейские исследователи начали исследовать и
								картографировать новые земли. Возрождение было
								временем огромных культурных и научных
								достижений, которые продолжают влиять на наше
								общество и сегодня.
							</p>
						</div>
					</div>
				</div>

				<div className="article">
					<h2>Современная история</h2>
					<div className="columns">
						<div className="column">
							<img
								src="modern_history.jpg"
								alt="Современная история"
							/>
							<p>
								Современная история начинается с конца XVIII
								века и продолжается до наших дней. Этот период
								характеризуется быстрым технологическим
								прогрессом, социальными и политическими
								переменами, а также глобализацией.
							</p>
						</div>
						<div className="column">
							<p>
								Такие события, как Французская революция,
								промышленная революция и мировые войны, оказали
								значительное влияние на формирование
								современного мира. Сегодняшний мир продолжает
								меняться под влиянием новых технологий и
								глобальных тенденций.
							</p>
						</div>
					</div>
				</div>
			</div>

			<footer>
				<p>© 2024 Всемирная история. Все права защищены.</p>
			</footer>
		</div>
	);
};

export default Gazeta;
