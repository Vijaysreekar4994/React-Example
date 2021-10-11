import React, { useEffect, useState } from "react";
import Styles from "../../assets/Styles";
import { movies$ } from "../../assets/movies";
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
import { connect, useSelector } from "react-redux";

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

const Home = (props) => {
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [catName, setCatName] = useState([]);
  const searchIndex = useSelector((state) => state.SelectMultiple.Category);

  useEffect(() => {
    movies$.then((data) => {
      setList(data);
      let categories = [];
      for (let i = 0, len = data.length; i < len; i++) {
        categories[data[i].id] = data[i].category;
      }
      let newCategoryList = [];
      let RemoveDuplicates = categories.filter(function (item, position) {
        return categories.indexOf(item) == position;
      });
      newCategoryList = RemoveDuplicates;
      setCategoryList(newCategoryList);
    });
  }, []);
  console.log(categoryList, "categoryList local state");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCatName(typeof value === "string" ? value.split(",") : value);
    // props.filterMultiple([{ Category: categoryList }]);
  };
  const { cardActions, Wcolor } = Styles();
  return (
    <div>
      <FormControl sx={{ m: 5, width: 350, display: "flex" }}>
        <InputLabel style={{ color: "gray" }}>Select</InputLabel>
        <Select
          multiple
          style={{ border: "solid gray" }}
          value={catName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categoryList.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
                      startIcon={<ThumbUpAltOutlinedIcon style={Wcolor} />}
                    >
                      {row.likes}
                    </Button>
                    <Button
                      style={Wcolor}
                      startIcon={<ThumbDownAltOutlinedIcon style={Wcolor} />}
                    >
                      {row.dislikes}
                    </Button>
                    <IconButton aria-label="delete" size="small">
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
    filterMultiple(filterMultiple) {
      dispatch({ type: "filter", filterMultiple });
    },
  };
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
