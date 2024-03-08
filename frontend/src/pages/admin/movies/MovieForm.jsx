import { Button, Form, Input, Select, Tabs, message } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import { antValidationerror } from "../../../helpers";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadSlice";
import { GetAllArtist } from "../../../apis/artist";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { GetMovieById } from "../../../apis/movies";
import moment from "moment";
function MovieForm() {
  const [file,setFile] = React.useState(null);
  const [artists = [], setArtists] = React.useState([]);
  const [movie, setMovie] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const getArtists = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtist();
      setArtists(
        response.data.map(() => ({
          value: artists._id,
          label: artists.name,
        }))
      );
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const getMovie = async(id)=>{
    try {
      dispatch(SetLoading(true));
      const response = await GetMovieById(id);
      response.data.releaseDate = moment(response.data.releaseDate).format(
        "YYYY-MM-DD"
      );
      response.data.cast = response.data?.cast?.map((artist) => artist._id);
      response.data.hero = response.data?.hero._id;
      response.data.heroine = response.data?.heroine._id;
      response.data.director = response.data?.director._id;
      setMovie(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  }
  const onFinish = async(values) => {
    try {
      dispatch(SetLoading(true));
      let response;
      if (params?.id){
        response = await UpdateMovie(params.id, values);
      }else{
        response = await AddMovie(values);
      };
      message.success(response.message);
      dispatch(SetLoading(false));
      navigate('/admin');
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const imageUpload = async ()=>{
    try {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(SetLoading(true));
      const response = await UploadImage(formData);
      if(response.success){
        const response2 = await UpdateMovie(movie._id, {
          ...movie,
          posters:[...movie?.posters || [], response.data],
        });
        setMovie(response2.data);
        setFile(null);
      };
      dispatch(SetLoading(false));
      //form.setFieldValue({profilePic: response.data});
      message.success(response.message);
      navigate('/admin');
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const deleteImage = async(image) =>{
    try{
    dispatch(SetLoading(true));
    const response = await UpdateMovie(movie._id,{
      ...movie,
      posters: movie?.posters?.filter((item)=> item !== image),
    });
    dispatch(SetLoading(false));
    message.success(response.message);
    setMovie(response.data);
  } catch (error) {
    message.error(error.message);
    dispatch(SetLoading(false));
  }
  
  }
  React.useEffect(() => {
    getArtists();
  }, []);
  
  useEffect(()=>{
    if (params?.id){
      getMovie(params.id);
    }
  },[artists])
  return (
    (movie || !params.id) && (<div>
      <h1 className="text-grey-600 text-xl font-semibold">{params?.id?"Edit Movie":"Add Movie"}</h1>
      <Tabs>
        <Tabs.TabPane tab="Details" key="1">
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
            initialValues={movie}
          >
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Name"
                name={"Name"}
                rules={antValidationerror}
                className="col-span-2"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Release Date"
                name={"Release Date"}
                rules={antValidationerror}
              >
                <Input type="date" />
              </Form.Item>
            </div>
            <Form.Item
              label="Plot"
              name={"Plot"}
              rules={antValidationerror}
              className="col-span-2"
            >
              <Input.TextArea />
            </Form.Item>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Hero"
                name={"Hero"}
                rules={antValidationerror}
                className="col-span-2"
              >
                <Select options={artists} showSearch />
              </Form.Item>
              <Form.Item
                label="Heroine"
                name={"Heroine"}
                rules={antValidationerror}
                className="col-span-2"
              >
                <Select options={artists} showSearch />
              </Form.Item>
              <Form.Item
                label="Director"
                name={"Director"}
                rules={antValidationerror}
                className="col-span-2"
              >
                <Select options={artists} showSearch />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Genre"
                name={"Genre"}
                rules={antValidationerror}
                className="col-span-2"
              >
                <Select
                  options={[
                    {
                      label: "Action",
                      value: "Action",
                    },
                    {
                      label: "Comedy",
                      value: "Comedy",
                    },
                    {
                      label: "Horror",
                      value: "Horrror",
                    },
                    {
                      label: "Romance",
                      value: "Romance",
                    },
                  ]}
                  mode="multiple"
                />
              </Form.Item>
              <Form.Item
                label="Language"
                name={"Language"}
                rules={antValidationerror}
                className="col-span-2"
              >
                <Select
                  options={[
                    {
                      label: "English",
                      value: "English",
                    },
                    {
                      label: "Punjabi",
                      value: "Punjabi",
                    },
                    {
                      label: "Hindi",
                      value: "Hindi",
                    },
                    {
                      label: "Tamil",
                      value: "Tamil",
                    },
                    {
                      label: "Telgu",
                      value: "Telgu",
                    },
                    {
                      label: "Haryanvi",
                      value: "Haryanvi",
                    },
                  ]}
                  mode="multiple"
                />
              </Form.Item>
              <Form.Item
                label="Trailer"
                name={"Trailer"}
                rules={antValidationerror}
                className="col-span-2"
              >
                <Input type="text" />
              </Form.Item>
            </div>
            <Form.Item
              label="Cast & Crew"
              name={"Cast"}
              rules={antValidationerror}
              className="col-span-2"
            >
              <Select options={artists} mode="tags" />
            </Form.Item>
          </Form>
          <div className="flex justify-end gap-5">
            <Button onClick={()=>{navigate('/admin');}}>Cancel</Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Posters" key="2" disabled={!movie}>
        <div className="flex flex-wrap gap-5 mb-10">
        {movie?.posters?.map((image)=>(
          <div key={image}
          className="flex gap-5 border border-dashed p-3">
            <img src = {img} alt="" 
            className="w-20 h-20 object-cover"/>
            <i className="ri-delete-bin-6-line" 
          onClick={()=>{
           deleteImage(image);
          }}></i>
          </div>
        ))}
        </div>          
        <Upload
            onChange={(info) => {
              setFile(info.file);
            }}
            beforeUpload={() => false}
            listType="picture"
          >
           <Button>
            click here to Upload
            </Button> 
          </Upload>
          <div className="flex justify-end gap-5 mt-5">
            <Button onClick={()=>{navigate('/admin');}}>Cancel</Button>
            <Button type="primary" onClick={()=>{
              imageUpload();
            }}>
              Upload Poster
            </Button>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
    )
  );
}

export default MovieForm;
