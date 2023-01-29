import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../utils/TypeScript";
import HeaderShowTitle from "../components/HeaderShowTitle";
import InputText from "../components/InputText";
import { getConversation } from "../redux/actions/messageAction";
import Loading from "../components/Loading";
const Messages = () => {
  const { auth, message } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch<any>()
  const navigation = useNavigation<any>()
  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    dispatch(getConversation(auth))
  }, [auth])

  return (
    <View style={styles.container}>
      <HeaderShowTitle
        title={auth.user?.name ? auth.user?.name : "winter_love03"}
      />
      <View style={{ padding: 20, flex: 1 }}>
        <InputText
          icon="search"
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {
            message.loadConversation ?
              <Loading />
              :
              // message.data.length > 0 ? 
              // <ScrollView style={{ flex: 1, padding: 16}}>
              //   {
              //     message.data.map((item, index) => (
              //       <
              //     ))
              //   }
              // </ScrollView>
              // :
              <>
                <Text style={{ fontSize: 18, fontWeight: '400', color: '#000', marginBottom: 10 }}>
                  Message your friends
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '300', color: '#333', textAlign: 'center', marginBottom: 10 }}>
                  Message, video call or share your favorite posts directly with people you care about
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '300', color: '#333', textAlign: 'center' }}>
                  People who use Winter Social can chat across apps. Use Message Controls in settings to decide who you want to hear from.
                </Text>
              </>
          }
        </View>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
