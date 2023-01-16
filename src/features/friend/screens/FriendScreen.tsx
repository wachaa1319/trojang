import React, { useContext, useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  RootStackNavigationProp,
  HomeStackParamList,
  RootStackScreenProps,
} from "../../../../types";
import { UserContext } from "../../../contexts/user/userContext";
import {
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  ScrollView,
  Text,
  useColorModeValue,
  View,
} from "native-base";
import BackButton from "../../../components/BackButton";
import { SafeBottom, SafeTop } from "../../../components/SafeTop";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FriendshipIcon } from "../../../components/FriendshipIcon";
import { PhoneNumberList } from "../../../components/PhoneNumberList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FriendContext } from "../../../contexts/friend/FriendContext";
import { SvgXml } from "react-native-svg";
import { BlurView } from "expo-blur";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { presentFormAsync } from "expo-contacts";

export function FriendScreen() {
  const navigation = useNavigation<RootStackNavigationProp<"Friend">>();
  const route = useRoute<RouteProp<HomeStackParamList, "Friend">>();

  const { userData, favoriteFriend } = useContext(UserContext);
  const { friends, removeFriend, editContact } = useContext(FriendContext);
  const { id } = route.params;

  const insets = useSafeAreaInsets();
  const [friend, setFriend] = React.useState(
    friends?.find((f) => f.contactId == id)
  );
  const tintMode = useColorModeValue("light", "dark");

  useEffect(() => {
    setFriend(friends?.find((f) => f.contactId == id));
  }, [friends]);

  return (
    <>
      <BackButton _light={{ color: "white" }} zIndex={5} />
      <LinearGradient
        pointerEvents="none"
        style={{
          zIndex: 2,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        colors={["black", "transparent", "transparent", "transparent"]}
      />
      <View position={"absolute"} left={"10"} zIndex={5} mx={2}>
        <SafeTop />
        <Heading fontSize="4xl" color={"light.100"} shadow={"9"}>
          {friend?.contact.nickname || friend?.contact.name}
        </Heading>
        <Text fontSize="lg" color={"light.100"}>
          {friend?.contact.nickname && friend?.contact.name}
        </Text>
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
            userData?.favorites?.find(
              (fav) => fav.contactId == friend?.contactId
            )
              ? "solid"
              : "outline"
          }
          onPress={() => friend && favoriteFriend(friend)}
          icon={<Ionicons name="heart" />}
          _icon={{ color: "white" }}
          size="lg"
        />
      </View>

      <ScrollView
        variant="background"
        flex={1}
        flexGrow={1}
        _contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          {friend?.contact.image?.uri ? (
            <Image
              source={friend?.contact.image}
              width="full"
              height={350}
              alt="Profile"
              zIndex={-1}
            />
          ) : (
            <View m={1}>
              <SvgXml
                width="100%"
                height="400px"
                xml={friend?.avatar}
                style={[
                  StyleSheet.absoluteFill,
                  { overflow: "visible", marginVertical: 50 },
                ]}
              />
              <BlurView
                tint={tintMode}
                intensity={100}
                style={{ overflow: "visible", paddingVertical: 50 }}
              >
                <SvgXml width="100%" height="400px" xml={friend?.avatar} />
              </BlurView>
            </View>
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 10,
              bottom: 10,
              left: 10,
            }}
            onPress={async () => {
              await editContact(friend?.contactId!);
            }}
          >
            <View
              flexDir={"row"}
              alignItems={"center"}
              variant="background"
              shadow={2}
              // borderColor={"pink.500"}
              padding="2"
              borderRadius={"md"}
            >
              <Icon
                as={<Ionicons name="pencil" />}
                size="lg"
                color={"light.100"}
                _light={{
                  color: "dark.100",
                }}
              />
              <Heading size={"sm"} ml={2}>
                Edit
              </Heading>
            </View>
          </TouchableOpacity>
        </View>

        <View p={3} flex={1}>
          <Heading m={2} fontSize="2xl">
            Numbers
          </Heading>
          <PhoneNumberList phoneNumbers={friend?.contact.phoneNumbers} />
          {/* <Heading m={2} fontSize="2xl">
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
          </Text> */}

          <Heading m={2} fontSize="2xl">
            Friendships
          </Heading>
          <Text mx={"5"}>{friend?.friendship.points}</Text>
          <Heading m={2} fontSize="2xl">
            Delete Friend
          </Heading>
          <Button
            colorScheme="secondary"
            m="5"
            onPress={() => {
              Alert.alert(
                "Delete Friend",
                "Are you sure you want to delete your friend?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      removeFriend(friend?.contactId!);
                      navigation.goBack();
                    },
                    style: "destructive",
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            Delete Friend
          </Button>
          <SafeBottom />
        </View>
      </ScrollView>
    </>
  );
}
