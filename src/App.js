import React, { Component } from 'react';
import queryString from 'query-string';
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
      <img src={this.props.playlist.imageUrl} style={{width:"25%"}}/>
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
    const parsed = queryString.parse(window.location.search);
     console.log(parsed);
     const accessToken=parsed.access_token;
     if(!accessToken) return;
     fetch('https://api.spotify.com/v1/me',{
              headers: {
                'Authorization': 'Bearer ' + accessToken
            }
            }).then(res=>res.json())
              .then(data=>{
                  console.log(data);
                this.setState({user:{name:data.display_name}})
        })

      fetch('https://api.spotify.com/v1/me/playlists',{
              headers: {
                'Authorization': 'Bearer ' + accessToken
                  }
            }).then(res=>res.json())
              .then(data=>{
                  console.log(data);
                this.setState({
                  playlists:data.items.map(item=>({
                    name:item.name,
                    imageUrl:item.images[0].url,
                    songs:[]
                  }))
                })
        })
  }
  render() {
    let playlistToRender=
       this.state.user &&
       this.state.playlists
        ? this.state.playlists.filter(playlist=>
           {return playlist.name.toLowerCase().includes(
             this.state.filteredString.toLowerCase())})
              :[]

    return (
      
      <div className="App">
        
          {this.state.user ?
              <div>
                  <h1 className="App-title">{this.state.user.name}'s Playlist</h1>}
                  
                  <PlaylistCount playlists={ playlistToRender} />
                  <HoursCount playlists={playlistToRender}/>
                  
                  <Filter onTextChange={text=>{
                    this.setState({filteredString:text})} 
                  }/>
                  
                  { playlistToRender
                    .map(playlist=>
                      <Playlist playlist={playlist}/>
                    )}
              
              
              </div>: <button onClick={()=>window.location="http://localhost:8888/login"}
                    style={{padding:"20px" ,'font-size':'50px','margin-top':'20px'}}>Sign in with Spotify </button>
          }
        
      </div>
      
      
    );
  }
}

export default App;
