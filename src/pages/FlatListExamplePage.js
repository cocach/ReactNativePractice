/**
 * Created by Rookie on 2017/11/1.
 */

import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    ScrollView,
    Button,
    TouchableOpacity,
    Dimensions
} from "react-native";

import Icon from "../component/icon/icon";

const width = Dimensions.get("window").width;

const data = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26"
];

class Header extends Component {
    render() {
        let renderMyView = () => {
            let views = [];

            data.map((item, index) => {
                let view = <Text key={index}>Header {item}</Text>;
                views.push(view);
            });

            return views;
        };

        return (
            <View style={{ height: 200, backgroundColor: "#03A9F4" }}>
                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                    {/*{renderMyView()}*/}
                    <TouchableOpacity onPress={this.props.onSingle}>
                        <Text
                            style={{ margin: 30, fontSize: 20, color: "white" }}
                        >
                            单列
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.onDouble}>
                        <Text
                            style={{ margin: 30, fontSize: 20, color: "white" }}
                        >
                            双列
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

class Footer extends Component {
    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <Text style={{ padding: 10, fontSize: 18, height: 44 }}>
                    foot
                </Text>
            </View>
        );
    }
}

class EmptyComponent extends Component {
    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <Text style={{ padding: 10, fontSize: 18, height: 44 }}>
                    This is Empty Status
                </Text>
            </View>
        );
    }
}

class SeperatorComponent extends Component {
    render() {
        return (
            <View
                style={{ height: 10, backgroundColor: "white", width: width }}
            />
        );
    }
}

export default class FlatListExample extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
        const isInfo = state.params.mode === "info";
        const { title } = state.params;
        return {
            title: navigation.state.params.title,
            headerRight: (
                <Button
                    style={{ width: 100, marginRight: 5 }}
                    title={isInfo ? "Done" : "Edit"}
                    onPress={() =>
                        setParams({ mode: isInfo ? "none" : "info" })
                    }
                />
            )
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            num: 1,
            datas: data
        };
    }

    _onPress = () => {
        if (this.state.num === 1) {
            this.setState({
                num: 2
            });
        } else {
            this.setState({
                num: 1
            });
        }
    };

    _keyExtractor = (item, index) => item;
    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={this._onPress} activeOpacity={0.8}>
            {this.state.num === 1 ? (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#FF5252",
                        width: width
                    }}
                >
                    <Text
                        style={{
                            padding: 10,
                            fontSize: 18,
                            height: 44,
                            margin: 10,
                            color: "white"
                        }}
                    >
                        {item}
                    </Text>
                    <Icon name={"ios-share"} size={32} color="#fff" />
                    <Text
                        style={{
                            padding: 10,
                            fontSize: 18,
                            height: 44,
                            margin: 10,
                            color: "white"
                        }}
                    >
                        点我
                    </Text>
                </View>
            ) : (
                <View
                    style={{
                        margin: 5,
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#70ec86",
                        width: width / 2
                    }}
                >
                    <Text
                        style={{
                            padding: 10,
                            fontSize: 18,
                            height: 44,
                            margin: 10,
                            color: "white"
                        }}
                    >
                        {item}
                    </Text>
                    <Icon name={"ios-share"} size={32} color="#fff" />
                </View>
            )}
        </TouchableOpacity>
    );
    _onEndReached = ({ info }) => {
        console.log("onEndReach===" + info);
    };

    _onRefresh = () => {
        this.setState({
            refreshing: true
        });

        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000);
    };

    _onDouble = () => {
        if (this.state.num != 2) {
            this.setState({
                num: 2
            });
        }
    };

    _onSingle = () => {
        if (this.state.num != 1) {
            this.setState({
                num: 1
            });
        }
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    numColumns={this.state.num}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.refreshing}
                    data={this.state.datas}
                    key={this.state.num}
                    keyExtractor={this._keyExtractor}
                    renderItem={item => this._renderItem(item)}
                    ListHeaderComponent={
                        <Header
                            onSingle={this._onSingle}
                            onDouble={this._onDouble}
                        />
                    }
                    ListFooterComponent={Footer}
                    ListEmptyComponent={EmptyComponent}
                    ItemSeparatorComponent={SeperatorComponent}
                    onEndReachedThreshold={0.1}
                    onEndReached={info => this._onEndReached(info)}
                />
            </View>
        );
    }
}
