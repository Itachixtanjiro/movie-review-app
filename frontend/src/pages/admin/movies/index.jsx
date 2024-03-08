import { Button, Table } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {GetAllMovies} from '../../../apis/movies'
import { SetLoading } from '../../../redux/loadSlice';

function Movies() {
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getMovies = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllMovies();
      setMovies(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const deleteMovie = async(id)=>{
    try {
      dispatch(SetLoading(true));
      const response = await deleteMovie(id);
      message.success(response.message);
      getMovies();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  React.useEffect(() => {
    getMovies();
  }, []);
  const columns = [
    {
      title: "Movie",
      dataIndex: "profile",
      render: (text, record) => {
        const imageUrl = record?.posters?.[0] || "";
        return (
          <img src={imageUrl} alt="" className="w-20 h-20 rounded" />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Release date",
      dataIndex: "releaseDate",
      render : (text) =>{
        return getDateFormat(text);
      }
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Action",
      dataIndex: "action",
      render : (text,record)=>{
        return <div className="flex gap-2">
          <i className="ri-edit-2-fill" 
          onClick={()=>{
            navigate('/admin/movies/edit/${record._id}')
            setSelectedArtist(record);
            setShowArtistForm(true);
          }}></i>
          <i className="ri-delete-bin-6-line" 
          onClick={()=>{
           deleteArtist(record._id);
          }}></i>
        </div>
      }
    },
  ];
  return (
    <div>
      <div className='flex justify-center'>
      <Button
      onClick={()=>{
        navigate("/admin/movies/add")
      }}>Add Movie</Button>
    
    </div>
    <div className='mt-5'>
      <Table dataSource={movies} columns={columns}/>
    </div>
    </div>
  )
}

export default Movies