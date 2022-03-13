import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import "./UserList.css";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const UserList = ({ users, isLoading, page }) => {
  //const { handleFavorites } = usePeopleFetch();
  const [usersList, setUsersList] = useState(users);
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  const [prevFilteredUsers, setPrevFilteredUsers] = useState(users);
  const [filters, setFilters] = useState([]);
  const [ppl, setPpl] = useState("");

  const initialFavorites = JSON.parse(window.localStorage.getItem("favorites") || "[]");
  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorites = (user) => {
    var check1 = favorites.some((f) => f.email === user.email);
    var newFavoritesList = [];
    if (check1) {
      newFavoritesList = favorites.filter((f) => f.email != user.email);
      setFavorites(newFavoritesList);
    } else {
      newFavoritesList = [...favorites, user];
      setFavorites(newFavoritesList);
    }
    console.log("favorite users: ");
    console.log(newFavoritesList);
  };
  useEffect(() => {
    setUsersList(users);
  },[users]);
  

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleFilter = (nat) => {
    var newFilters = [];
    var newFilteredUsers = [];
    var check = filters.some((value) => value === nat);

    if (check) {
      newFilters = filters.filter((value) => value != nat);
      setFilters(newFilters);
    } else {
      newFilters = [...filters, nat];
      setFilters(newFilters);
    }
    if (newFilters.length == 0) {
      setFilteredUsers(users);
      setPrevFilteredUsers(users);
      console.log("no filter! ");
      console.log(users);
    } else {
      for (var i = 0; i < newFilters.length; i++) {
        var temp = users.filter((user) => user.nat == newFilters[i]);
        newFilteredUsers = [...newFilteredUsers, ...temp];
      }
      setFilteredUsers(newFilteredUsers);
      setPrevFilteredUsers(newFilteredUsers);
      console.log("filtered users of countries: " + newFilters);
      console.log(newFilteredUsers);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value != "") {
      setPpl(e.target.value);
      console.log(e.target.value);
    } else {
      setFilteredUsers(prevFilteredUsers);
      setPpl("");
      var prevFilters = filters.filter((f) => f != "search");
      setFilters(prevFilters);
    }
  };
  const Search = (e) => {
    if (e.key == "Enter" || e.target.id == "search") {
      var temp = users.filter(
        (value) => value.name.first == ppl || value.name.last == ppl || value.email == ppl
      );
      setFilteredUsers(temp);
      setFilters([...filters, "search"]);
    }
  };
  if(page=="Home"){
    return (
      <S.UserList>
        <div className="search-wrapper">
          <input
            className="search"
            placeholder="Search for People..."
            value={ppl}
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => Search(e)}
          />
          <svg
            onClick={(e) => Search(e)}
            id="search"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
            />
          </svg>
        </div>
  
        <S.Filters>
          <CheckBox value="BR" label="Brazil" onChange={(e) => handleFilter(e)} />
          <CheckBox value="AU" label="Australia" onChange={(e) => handleFilter(e)} />
          <CheckBox value="CA" label="Canada" onChange={(e) => handleFilter(e)} />
          <CheckBox value="DE" label="Germany" onChange={(e) => handleFilter(e)} />
          <CheckBox value="ES" label="Spain" onChange={(e) => handleFilter(e)} />
        </S.Filters>
        <S.List>
          {filters.length == 0
            ? usersList.map((user, index) => {
                return (
                  <S.User
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <S.UserPicture src={user?.picture.large} alt="" />
                    <S.UserInfo>
                      <Text size="22px" bold>
                        {user?.name.title} {user?.name.first} {user?.name.last}
                      </Text>
                      <Text size="14px">{user?.email}</Text>
                      <Text size="14px">
                        {user?.location.street.number} {user?.location.street.name}
                      </Text>
                      <Text size="14px">
                        {user?.location.city} {user?.location.country}
                      </Text>
                    </S.UserInfo>
                    <S.IconButtonWrapper
                      isVisible={
                        index === hoveredUserId ||
                        favorites.some((u) => user.email === u.email)
                      }
                    >
                      <IconButton>
                        <FavoriteIcon color="error" onClick={() => handleFavorites(user)} />
                      </IconButton>
                    </S.IconButtonWrapper>
                  </S.User>
                );
              })
            : filteredUsers.map((user, index) => {
                return (
                  <S.User
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <S.UserPicture src={user?.picture.large} alt="" />
                    <S.UserInfo>
                      <Text size="22px" bold>
                        {user?.name.title} {user?.name.first} {user?.name.last}
                      </Text>
                      <Text size="14px">{user?.email}</Text>
                      <Text size="14px">
                        {user?.location.street.number} {user?.location.street.name}
                      </Text>
                      <Text size="14px">
                        {user?.location.city} {user?.location.country}
                      </Text>
                    </S.UserInfo>
                    <S.IconButtonWrapper
                      isVisible={
                        index === hoveredUserId ||
                        favorites.some((u) => user.email === u.email)
                      }
                    >
                      <IconButton>
                        <FavoriteIcon color="error" onClick={() => handleFavorites(user)} />
                      </IconButton>
                    </S.IconButtonWrapper>
                  </S.User>
                );
              })}
  
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </S.List>
      </S.UserList>
    );
  }
  else{
    return (
      <S.UserList>
        <div className="search-wrapper">
          <input
            className="search"
            placeholder="Search for People..."
            value={ppl}
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => Search(e)}
          />
          <svg
            onClick={(e) => Search(e)}
            id="search"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
            />
          </svg>
        </div>
  
        <S.Filters>
          <CheckBox value="BR" label="Brazil" onChange={(e) => handleFilter(e)} />
          <CheckBox value="AU" label="Australia" onChange={(e) => handleFilter(e)} />
          <CheckBox value="CA" label="Canada" onChange={(e) => handleFilter(e)} />
          <CheckBox value="DE" label="Germany" onChange={(e) => handleFilter(e)} />
          <CheckBox value="ES" label="Spain" onChange={(e) => handleFilter(e)} />
        </S.Filters>
        <S.List>
          {filters.length == 0
            ? favorites.map((user, index) => {
                return (
                  <S.User
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <S.UserPicture src={user?.picture.large} alt="" />
                    <S.UserInfo>
                      <Text size="22px" bold>
                        {user?.name.title} {user?.name.first} {user?.name.last}
                      </Text>
                      <Text size="14px">{user?.email}</Text>
                      <Text size="14px">
                        {user?.location.street.number} {user?.location.street.name}
                      </Text>
                      <Text size="14px">
                        {user?.location.city} {user?.location.country}
                      </Text>
                    </S.UserInfo>
                    <S.IconButtonWrapper
                      isVisible={
                        index === hoveredUserId ||
                        favorites.some((u) => user.email === u.email)
                      }
                    >
                      <IconButton>
                        <FavoriteIcon color="error" onClick={() => handleFavorites(user)} />
                      </IconButton>
                    </S.IconButtonWrapper>
                  </S.User>
                );
              })
            : filteredUsers.map((user, index) => {
                return (
                  <S.User
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <S.UserPicture src={user?.picture.large} alt="" />
                    <S.UserInfo>
                      <Text size="22px" bold>
                        {user?.name.title} {user?.name.first} {user?.name.last}
                      </Text>
                      <Text size="14px">{user?.email}</Text>
                      <Text size="14px">
                        {user?.location.street.number} {user?.location.street.name}
                      </Text>
                      <Text size="14px">
                        {user?.location.city} {user?.location.country}
                      </Text>
                    </S.UserInfo>
                    <S.IconButtonWrapper
                      isVisible={
                        index === hoveredUserId ||
                        favorites.some((u) => user.email === u.email)
                      }
                    >
                      <IconButton>
                        <FavoriteIcon color="error" onClick={() => handleFavorites(user)} />
                      </IconButton>
                    </S.IconButtonWrapper>
                  </S.User>
                );
              })}
  
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        </S.List>
      </S.UserList>
    );
  }
  
};

export default UserList;
