import React, { useContext } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList, RootStackScreenProps } from "../../../../types";
import { UserContext } from "../../../contexts/user/context";
import {
  Heading,
  Icon,
  IconButton,
  Image,
  ScrollView,
  Text,
  View,
} from "native-base";
import BackButton from "../../../components/BackButton";
import { SafeTop } from "../../../../components/SafeTop";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FriendshipIcon } from "../../../components/FriendshipIcon";
import { PhoneNumberList } from "../../../components/PhoneNumberList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FriendContext } from "../../../contexts/FriendContext";

export function FriendScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Friend">>();

  const { userData, favoriteFriend } = useContext(UserContext);
  const { friends } = useContext(FriendContext);
  const { id } = route.params;

  const insets = useSafeAreaInsets();
  const [friend, setFriend] = React.useState(friends?.find((f) => f.id == id));

  // profile
  // name
  // edit
  // recents

  //memories
  // friendships
  // number
  return (
    <>
      <BackButton _light={{ color: "white" }} />
      <View position={"absolute"} left={"10"} zIndex={5} mx={2}>
        <SafeTop />
        <Heading fontSize="4xl" color={"light.100"} shadow={"9"}>
          {friend?.nickname || friend?.name}
        </Heading>
        <Text fontSize="lg" color={"light.100"}>
          {friend?.nickname && friend?.name}
        </Text>
        {/* <FriendshipIcon friendship={friend?.friendship!} /> */}
      </View>
      <View
        top={insets.top + 5 + "px"}
        position={"absolute"}
        zIndex={10}
        right={"12px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <IconButton
          colorScheme="pink"
          alignSelf={"center"}
          rounded={"full"}
          variant={
            userData?.favorites?.find((fav) => fav.id == friend?.id)
              ? "solid"
              : "outline"
          }
          onPress={() => friend && favoriteFriend(friend)}
          icon={<Ionicons name="heart" />}
          _icon={{ color: "white" }}
          size="lg"
        />
      </View>

      <ScrollView variant="background" flex={1}>
        <View>
          <>
            <LinearGradient
              style={{
                zIndex: 2,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              colors={["black", "transparent", "transparent"]}
            />
            <Image
              source={
                friend?.image || {
                  uri: "https://placebeard.it/350x200",
                }
              }
              width="full"
              height={350}
              alt="Profile"
              zIndex={-1}
            />
          </>
        </View>
        {/* <Text>
          {id} {JSON.stringify(friend)}{" "}
ASSDFAAJKL> </Text> */}
        <View p={3}>
          <Heading m={2} fontSize="2xl">
            Numbers
          </Heading>
          <PhoneNumberList phoneNumbers={friend?.phoneNumbers} />
          <Heading m={2} fontSize="2xl">
            Memories
          </Heading>
          <Text m={5} fontSize={"lg"}>
            in the future
          </Text>
          <Heading m={2} fontSize="2xl">
            History
          </Heading>
          <Text m={5} fontSize={"lg"}>
            in the future
          </Text>
          <Heading m={2} fontSize="2xl">
            Friendships
          </Heading>
          <Text mx={"5"}>{friend?.friendship.points}</Text>
        </View>
      </ScrollView>
    </>
  );
}
