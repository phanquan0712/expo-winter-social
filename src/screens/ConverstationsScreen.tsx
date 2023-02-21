import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../utils/TypeScript";
import HeaderShowTitle from "../components/HeaderShowTitle";
import { getConversation } from "../redux/actions/messageAction";
import Loading from "../components/Loading";
import { getApi } from "../utils/fetchData";
import { ShowError } from "../utils/ShowMessage";
import Icon from "react-native-vector-icons/FontAwesome5";
import CardPeopleItemSearch from "../components/CardPeopleItemSearch";
interface IState {
  avatar: string,
  username: string,
  fullname: string,
  _id: string
}
const Messages = () => {
  const { auth, message } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<any>()
  const navigation = useNavigation<any>()
  const [search, setSearch] = React.useState<string>("");
  const [load, setLoad] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<IState[]>([]);

  React.useEffect(() => {
    dispatch(getConversation(auth))
  }, [auth])

  React.useEffect(() => {
    const handleSearch = async () => {
      if (!search) return;
      try {
        let searchString = search.trim().toLowerCase()
        setLoad(true);
        const res = await getApi(`search?username=${searchString}`, auth.access_token);
        setUsers(res.data.users);
        setLoad(false)
      } catch (err: any) {
        return ShowError(err.response.data.msg)
      }
    }
    handleSearch()
  }, [search])

  return (
    <SafeAreaView style={styles.container}>
      <HeaderShowTitle
        title={auth.user?.username as string}
      />
      <View style={{ padding: 10, flex: 1 }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
           }}>
            <Icon 
              name="search"
              size={18}
              color="#666"
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search user..."
              placeholderTextColor={'#666'}
              style={{ color: '#333', marginLeft: 10, padding: 5, fontSize: 14, fontWeight: '400', flex: 1 }}
            />
          </View>
          {
            search &&
            <TouchableOpacity
              onPress={() => {
                setSearch("")
                setUsers([])
              }}
            >
              <Icon
                name="times"
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          }
        </View>
        {
          load ? 
          <Loading />
          :
          users.length > 0 &&
          <View style={{ 
            marginBottom: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            backgroundColor: '#fff',
          }}>
             {
                users.map((item: IState) => (
                   <CardPeopleItemSearch
                      key={item._id}
                      avatar={item.avatar}
                      username={item.username}
                      fullname={item.fullname}
                      _id={item._id}
                   />
                ))
             }
          </View>
        }
        <ScrollView style={{ flex: 1 }}>
          {
            message.loadConversation ?
              <Loading />
              :
              <View style={{
                flex: 1, 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100
              }}> 
                <Text style={{ fontSize: 18, fontWeight: '400', color: '#000', marginBottom: 10 }}>
                  Message your friends
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '300', color: '#333', textAlign: 'center', marginBottom: 10 }}>
                  Message, video call or share your favorite posts directly with people you care about
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '300', color: '#333', textAlign: 'center' }}>
                  People who use Winter Social can chat across apps. Use Message Controls in settings to decide who you want to hear from.
                </Text>
              </View>
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
