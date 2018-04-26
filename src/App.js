import React, { Component } from 'react';
import './App.css';
let defaultTextColor='#fff';
let fakeServerData={
  user:{
    name:'Ranjan',
  
  playlists:[
    {
      name:'my fav songs',
      songs:[{name:'crying in the club',duration:1000},{name:'numb',duration:1200},{name:'hey mama',duration:1500},{name:'lost in the star ',duration:900}]
    },
    {
      name:'staurday specials',
      songs:[{name:'crying in the club',duration:1000},{name:'numb',duration:1200},{name:'hey mama',duration:1500},{name:'lost in the star ',duration:900}]
    },
    {
      name:'workout songs',
      songs:[{name:'crying in the club',duration:1000},{name:'numb',duration:1200},{name:'hey mama',duration:1500},{name:'lost in the star ',duration:900}]
    },{
      name:'Love tunes',
      songs:[{name:'crying in the club',duration:1000},{name:'numb',duration:1200},{name:'hey mama',duration:1500},{name:'lost in the star ',duration:900}]
    }
  ]
}
}

class PlaylistCount extends Component {
   render(){
     return (
       <div style={{width:'40%',display:"inline-block"}} className="aggregate">
        <h2 style={{}}>{this.props.playlists && this.props.playlists.length} Playlists</h2>
       </div>
     )
   }
}

class HoursCount extends Component {
  
  render(){
    let allSongs=this.props.playlists.reduce((songs,eachplaylist)=>{
        return songs.concat(eachplaylist.songs);
    },[])

    let duration=allSongs.reduce((sum,eachSong)=>{
        return sum + eachSong.duration;
    },0)

    return (
      <div style={{width:'40%',display:"inline-block"}} className="aggregate">
       <h2 style={{}}>{Math.round(duration/60)} hours</h2>
      </div>
    )
  }
}

class Filter extends Component{
  render(){
    return(
      <div className="filter">
       <img />
        <input type="text" onKeyUp={event=>this.props.onTextChange(event.target.value)} />
        
      </div>
    )
  }
}

class Playlist extends Component{
  render(){
    return(
      <div style={{display:"inline-block",width:"25%"}} className="playlist">
      <img />
      <h3 >{this.props.playlist.name}</h3>
       <ul>
        {this.props.playlist.songs.map(song=><li >{song.name}</li>)}
       
       
       </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super()
    this.state={serverData:'',filteredString:''}
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({serverData:fakeServerData})

    },2000);
  }
  render() {
    let playlistToRender=this.state.serverData.user? this.state.serverData.user.playlists.filter(playlist=>{
      return playlist.name.toLowerCase().includes(this.state.filteredString.toLowerCase())}
     ):[]

    return (
      
      <div className="App">
        
          {this.state.serverData.user ?
          <div>
          <h1 className="App-title">{this.state.serverData.user.name}'s Playlist</h1>}
          
          <PlaylistCount playlists={ playlistToRender} />
          <HoursCount playlists={playlistToRender}/>
          
          <Filter onTextChange={text=>{
            this.setState({filteredString:text})} 
           }/>
          
           { playlistToRender
            .map(playlist=>
               <Playlist playlist={playlist}/>
            )}
          
          
          </div>: <h1 style={{color:"white"}}>loading....</h1>
          }
        
      </div>
      
      
    );
  }
}

export default App;
