import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import { RootStore, IPost } from "../utils/TypeScript";
import PostCardItem from "../components/PostCardItem";
import { getPost } from "../redux/actions/postAction";
import Modal from "../components/Modal";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { getApi } from '../utils/fetchData'
import * as Notifications from 'expo-notifications'
const HomeScreen = () => {
  const { auth, post } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const listOptions: any[] = [
    {
      icon: "link",
      title: "Copy Link",
    },
    {
      icon: "share-alt",
      title: "Share",
    },
    {
      icon: "bookmark",
      title: "Save",
    },
    {
      icon: "qrcode",
      title: "QR Code",
    },
    {
      icon: "star",
      title: "ADd to favorites",
    },
    {
      icon: "flag",
      title: "Report",
    },
    {
      icon: "ban",
      title: "Hide",
    },
  ];

  React.useEffect(() => {
    if (modalVisible) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
        tabBarVisible: false,
      });
      return () =>
        navigation.setOptions({
          tabBarStyle: undefined,
          tabBarVisible: undefined,
        });
    }
  }, [navigation, modalVisible]);

  React.useEffect(() => {
    dispatch(getPost(auth.access_token));
  }, [dispatch, auth.access_token]);


  const handleModal = (post: IPost) => {
    if (!modalVisible) {
      setModalVisible(true);
    }
    console.log(post);
  };

  const handleLoadMore = async () => {
    dispatch(getPost(auth.access_token, 1, page + 1))
    setPage(page + 1)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Winter</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate('ConverstationsScreen')}
          >
            <Icon name="facebook-messenger" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {
        post.load ?
          <Loading />
          :
          post.posts?.length > 0 ?
            <ScrollView
              style={{
                flex: 1,
                width: "100%",
              }}
            >
              {
                post.posts?.length > 0 &&
                post.posts?.map(item => (
                  <PostCardItem
                    post={item}
                    key={item._id}
                    handleModal={handleModal}
                  />
                ))
              }
              <TouchableOpacity
                onPress={handleLoadMore}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  width: 100,
                  backgroundColor: '#3ab1da',
                  alignSelf: 'center',
                  marginBottom: 20,
                  borderRadius: 10
                }}
              >
                {
                  post.isLoadMore ?
                    <ActivityIndicator size="small" color="#666" />
                    :
                    <Text style={{
                      fontSize: 16,
                      color: 'white',
                      fontWeight: '500',
                    }}>Load more</Text>
                }
              </TouchableOpacity>
            </ScrollView>
            :
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
              marginTop: 20
            }}>
              No Post
            </Text>
      }
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={listOptions}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 16,
    color: "#000",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  modalBottomSheet: {
    flex: 1,
    backgroundColor: "red",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: "absolute",
  },
});