import React from 'react';
import Progress from '../components/progress';
import './player.less';
let duration = null;
let Player = React.createClass({
	getInitialState(){
		return {
			progress:0,
			volume:0,
		}
	},
	componentDidMount(){
		$("#player").bind($.jPlayer.event.timeupdate,(e)=>{
			duration = e.jPlayer.status.duration;
			this.setState({
				volume:e.jPlayer.options.volume*100,
				progress:e.jPlayer.status.currentPercentAbsolute
			});
		});
	},
	componentWillUnMount(){
		$("#player").unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandler(progress){
		//父组件接收子组件值
		
		console.log(progress)
		$("#player").jPlayer('play',duration * progress)
	},
	changeVolumeHandler(progress){
		$("#player").jPlayer('volume',progress)
	},
	render(){
		return(
			<div className="player-page">
				<h1 className="caption">
					
				</h1>
				<div className="mt20 row">
					<div className="controll-wrapper">
						<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
						<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
						<div className="row mt20">
							<div className="left-time -col-auto">-this.state.leftTime</div>
							<div className="volume-container">
								<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
								<div className="volume-wrapper">
									<Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
										barColor='#aaa'
									>
									</Progress>
								</div>
							</div>
						</div>
						<div style={{height: 10, lineHeight: '10px'}}>
							<Progress
								progress={this.state.progress}
								onProgressChange={this.progressChangeHandler}
							>
							</Progress>
						</div>
						<div className="mt35 row">
							<div>
								<i className="icon prev"></i>
								<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} ></i>
								<i className="icon next ml20" ></i>
							</div>
							<div className="-col-auto">
								<i className={`icon repeat-${this.props.repeatType}`} ></i>
							</div>
						</div>
					</div>
					<div className="-col-auto cover">
						<img src={this.props.currentMusicItem.cover}  alt={this.props.currentMusicItem.title}/>
					</div>
				</div>
			</div>
		);	
	}
})

export default Player;