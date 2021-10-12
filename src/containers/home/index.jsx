import React, { useEffect, useState } from "react";
import Styles from "../../assets/Styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import Grid from "@mui/material/Grid";

import {
  InputLabel,
  FormControl,
  Select,
  makeStyles,
  MenuItem,
  Input,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { connect } from "react-redux";
import MultipleSelectChip from "../../components/SelectMultiple";
import { getMovies, setMovies } from "../../data/actions/selectMultiple.action";
import { getCategoryList, getFilteredArray, getPaginationArray } from "../../data/adapters/selectMultiple.adapter";
import Pagination from "../../components/Pagination";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const { cardActions, Wcolor } = Styles();


const Home = ({getData,setData, data}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedList, setSelectedList] =useState([]);
  const [list, setList] = useState(data);
  const [filteredList,setFilteredList]=useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  // const searchIndex = useSelector((state) => state.SelectMultiple.Category);
  useEffect(() => {
    getData()
  }, []);

  useEffect(()=>{
   const adaptedCategoryList= getCategoryList(data)
   setCategoryList(adaptedCategoryList)
  },[data])

  useEffect(()=>{
  setList(getPaginationArray(selectedList,data,page, rowsPerPage))
   setFilteredList(getFilteredArray(selectedList,data))
  },[selectedList, data,page, rowsPerPage])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedList(
      typeof value === 'string' ? value.split(',') : value,
    );
    setPage(0)
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteMovie=(id)=> {
    let temp = data.filter(movie => movie.id !== id);
    setData(temp)
  }

  const handleLike=(id)=>{
    let temp = data.map(movie =>{ 
     if( movie.id === id){
       movie.likes+=1
     }
     return movie
    });
    setData(temp)
  }

  const handleDislike=(id)=>{
    let temp = data.map(movie =>{ 
     if( movie.id === id){
       movie.dislikes+=1
     }
     return movie
    });
    setData(temp)
  }


  return (
    <div>
      <MultipleSelectChip 
      names={categoryList}
       handleChange={handleChange}
       selectedList={selectedList}
        />
        <Pagination 
        count={filteredList.length}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        rowsPerPage={rowsPerPage} 
        page={page} />
      <Box sx={{ flexGrow: 1 }} style={{ margin: 50 }}>
        <Grid container spacing={3} xl={12}>
          {list.map((row, index) => {
            return (
              <Grid key={index} container item spacing={1} xs xl={3} md={6}>
                <Card variant="outlined" style={{ backgroundColor: "gray" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {row.category}
                    </Typography>
                    <Typography variant="h5">{row.title}</Typography>
                  </CardContent>
                  <CardActions style={cardActions}>
                    <Button
                      style={Wcolor}
                      onClick={()=>handleLike(row.id)}
                      startIcon={<ThumbUpAltOutlinedIcon style={Wcolor} />}
                    >
                      {row.likes}
                    </Button>
                    <Button
                      style={Wcolor}
                      onClick={()=>handleDislike(row.id)}
                      startIcon={<ThumbDownAltOutlinedIcon style={Wcolor} />}
                    >
                      {row.dislikes}
                    </Button>
                    <IconButton aria-label="delete" size="small" onClick={() => {
                                handleDeleteMovie(row.id);
                            }}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getData:()=>dispatch(getMovies()),
    setData:(data)=>dispatch(setMovies(data))
    }
  };

function mapStateToProps(state) {
  return {
    data: state.selectMultiple.data
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
