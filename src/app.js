/**
 * Created by Rookie on 2017/8/16.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    PixelRatio,
    ToastAndroid,
    ScrollView, Button, Image,
    DeviceInfo,
    NativeModules,
} from 'react-native';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let pixelRatio = PixelRatio.get();


const pt2px = (pt) => PixelRatio.getPixelSizeForLayoutSize(pt);
const px2pt = (px) => PixelRatio.roundToNearestPixel(px);


import {PullView} from 'react-native-pull';

import ImagePicker from 'react-native-image-crop-picker';
import Api from "./Api";
import FetchRequest from "./FetchRequest";

export default class app extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            photoUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503569324452&di=291c5ac3f92d1438c2c86d791e9ab56f&imgtype=0&src=http%3A%2F%2Fpic41.nipic.com%2F20140601%2F18681759_143805185000_2.jpg'
        };

        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);


    }

    _showDeviceInfo = () => {
        let names = "windowPhysicalPixels:\n";
        for (let name in DeviceInfo.Dimensions.windowPhysicalPixels) {
            names += name + ": " + DeviceInfo.Dimensions.windowPhysicalPixels[name] + "\n";
        }
        names += "\nscreenPhysicalPixels:\n";
        for (let name in DeviceInfo.Dimensions.screenPhysicalPixels) {
            names += name + ": " + DeviceInfo.Dimensions.screenPhysicalPixels[name] + "\n";
        }


        alert(names);
    };

    onPullRelease(resolve) {
        //do something
        setTimeout(() => {
            resolve();
        }, 3000);
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray"/>
                <Text ref={(c) => {
                    this.txtPulling = c;
                }}>下拉刷新pulling...</Text>
                <Text ref={(c) => {
                    this.txtPullok = c;
                }}>松开刷新pullok......</Text>
                <Text ref={(c) => {
                    this.txtPullrelease = c;
                }}>玩命刷新中pullrelease......</Text>
            </View>
        );
    }

    _selectPhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            enableRotationGesture: true,
        }).then(image => {
            console.log(image);
            this.setState({
                photoUrl: image.path,
            })
        }).catch(err => {
            console.log(err);
        });
    };
    _select_multi_Photo = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            multiple: true,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                photoUrl: image[0].path,
            })
        }).catch(err => {
            console.log(err);
        });
    };

    _openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                photoUrl: image.path,
            })
        }).catch(err => {
            console.log(err);
        });
    };

    _Scan = () => {

    };

    _Custom_Module = () => {
        NativeModules.CustomToastModule.showShort("11111");
    };
    _Custom_Module_1 = () => {
        NativeModules.CustomToastModule.showLong("22222");
    };

    _Custom_Param = () => {

        NativeModules.CustomParamsMoudle.choose({
            name: '1234',
        }).then(result => {
            ToastAndroid.show("Param from Activity is " + result, ToastAndroid.SHORT);
            console.log("---------" + result)
        }).catch(err => {
            console.log(err)
        })
    };

    _toCameraPage = () => {
        this.props.navigation.navigate('Camera');
    };

    _goToPage = (params) => {
        this.props.navigation.navigate(params);
    };

    _apiTest = () => {
        // Api.Get("http://cybershop4-dev-restapi.dev.co-mall/products/search?pn=1&ps=12&s=1", null, this._success, this._error)

        let url = '/products/search?';

        let param = {
            // "merchantId": "1",
            "pn": "1",
            "ps": "12",
            "s": "1"
            //"subsiteId": "1",
            // "osVersion":"10.0",
            // "appVersion":"1.0.0",
            // "unique":"1111111111"
        }



        let info = FetchRequest.fetchRequest(url,'get',param);

        info.then(
            (resData) => {
                console.log('data=' + resData);

            }).catch()

    };

    _success = (resData) => {
        console.log("success: " + resData);
    };

    _error = (error) => {
        console.log("error: " + error)
    };


    render() {
        return (
            <View style={[styles.container]} ref='myview'>
                <PullView
                    style={{width: Dimensions.get('window').width}} onPullRelease={this.onPullRelease}
                    topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}>
                    <View style={{backgroundColor: 'white'}}>


                        <Image
                            style={{width: Dimensions.get('window').width, height: 300}}
                            source={{
                                uri: this.state.photoUrl
                            }}/>


                        <View style={{flex: 1, marginTop: 10, width: Dimensions.get('window').width}}>

                            <View style={{borderRadius: 5, borderWidth: 1, borderColor: '#31cd96', margin: 10}}>

                                <Text style={{fontSize: 18, color: 'black', margin: 10}}>
                                    window.width={width + " dp\n"}
                                    window.height={height + " dp\n"}
                                    pixelRatio={pixelRatio + "\n"}

                                    分辨率={width * pixelRatio + "x" + height * pixelRatio}

                                    {"\n\n"}
                                    px2pt-width ={px2pt(300)}
                                    {"\n\n"}
                                    px2pt-height={px2pt(111)}
                                    {"\n"}
                                    pt2px-width={pt2px(width)}
                                    {"\n"}
                                    pt2px-height={pt2px(height)}


                                </Text>

                            </View>

                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='ApiTest'
                                    onPress={this._apiTest}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='ProductDetail'
                                    onPress={() => {
                                        this._goToPage('ProductDetail')
                                    }}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='FlatListExample'
                                    onPress={() => {
                                        this._goToPage('FlatListExample')
                                    }}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='tab-scrollable-view-index'
                                    onPress={() => {
                                        this._goToPage('IndexExample')
                                    }}
                                />
                            </View>

                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='Animations'
                                    onPress={() => this._goToPage('Animation')}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='SwiperExample'
                                    onPress={() => {
                                        this._goToPage('SwiperExample')
                                    }}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='MyScrollViewPage'
                                    onPress={() => {
                                        this._goToPage('MyScrollViewPage')
                                    }}
                                />
                            </View>

                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='AppList'
                                    onPress={() => {
                                        this._goToPage('AppList')
                                    }}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='TabLayout'
                                    onPress={() => {
                                        this._goToPage('TabLayout')
                                    }}
                                />
                            </View>

                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='ShowDeviceInfo'
                                    onPress={this._showDeviceInfo}
                                />
                            </View>


                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='Select Photo from gallery'
                                    onPress={this._selectPhoto}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='Multi_Select Photo from gallery'
                                    onPress={this._select_multi_Photo}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='Capture a Photo'
                                    onPress={this._openCamera}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='QR_Scan'
                                    onPress={this._Scan}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='Test_Custom_Module'
                                    onPress={this._Custom_Module}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='Test_Custom_Toast_Module_1'
                                    onPress={this._Custom_Module_1}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='Test_Custom_Params_Module'
                                    onPress={this._Custom_Param}
                                />
                            </View>
                            <View style={{margin: 10, width: Dimensions.get('window').width}}>
                                <Button
                                    title='OpenCamera'
                                    onPress={this._toCameraPage}
                                />
                            </View>


                        </View>
                    </View>
                </PullView>
            </View>
        );
    }

}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
    });