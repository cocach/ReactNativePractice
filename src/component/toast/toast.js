/**
 * Created by Rookie on 2017/12/19.
 */


import React, {Component} from 'react';
import {
    Modal,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    ToastAndroid, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import {StyledBackgroundView, StyledWindowView} from './style';

const invariant = require('fbjs/lib/invariant');

const VIEW_MARGIN = 15;
const SHORT_TIME = 3000;
const LONG_TIME = 5000;
let duration;


export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }


    static propTypes = {

        /**
         *  提示内容
         */
        content: PropTypes.string.isRequired,
        /**
         * 提示弹窗中的图标
         */
        image: PropTypes.string,

        /**
         * 是否作为loading弹窗
         */
        loading: PropTypes.bool,

        /**
         * 显示时长
         */
        duration: PropTypes.oneOfType([
            PropTypes.oneOf(['short', 'long']),
            PropTypes.number,
        ]).isRequired,

        /**
         * 关闭提示
         */
        hide: PropTypes.bool,

        /**
         * 点击显示区域外部后隐藏提示消息,只在duration=0时有效，默认为true
         */
        hideOnTouchOutSide: PropTypes.bool,

        /**
         * Android 按下返回键后是否隐藏消息，只在duration=0时有效，默认为true
         */
        hideOnBackPress: PropTypes.bool,

    };

    static defaultProps = {
        content: '',
        image: '',
        duration: 'short',
        hide: false,
        hideOnTouchOutSide: true,
        hideOnBackPress: true,
    };


    /**
     * 格式化枚举类型duration
     * @param props
     */
    formatDuration = (props) => {
        switch (props.duration) {
            case 'short':
                duration = SHORT_TIME;
                break;
            case 'long':
                duration = LONG_TIME;
                break;
            default:
                duration = props.duration;
                break;
        }
    };


    componentWillReceiveProps(props) {
        console.log(new Date().toLocaleTimeString() + "  props:componentWillReceiveProps props==" + JSON.stringify(props));


        invariant(
            props.duration !== undefined,
            'duration is required,must be number'
        );

        this.formatDuration(props);

        if (duration > 0 && this.state.visible === false) {

            console.log("come here");

            this.setState({
                visible: true,
            });

            setTimeout(() => {
                this.setState({
                    visible: false
                })
            }, duration);


        } else {

            console.log("come to here");


            if (props.hide) {

                console.log("come to here hide");

                this.setState({
                    visible: false
                })
            } else {
                this.setState({
                    visible: true,
                });
            }
        }


    }

    backgroundClick = () => {

        if (duration <= 0 && this.props.hideOnTouchOutSide) {
            this.setState({
                visible: false
            })
        }


    };


    onRequestClose = () => {
        console.log("i want close");

        if (duration <= 0 && this.props.hideOnBackPress) {
            this.setState({
                visible: false
            })
        }
    };

    render() {


        const {content, image, loading} = this.props;


        console.log("content ==" + JSON.stringify(this.props));


        let onlyTextContent = image === '';


        invariant(
            typeof content !== undefined,
            'content is required,must be string'
        );

        return (

            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this.onRequestClose}
            >


                <TouchableOpacity onPress={this.backgroundClick} activeOpacity={1}>
                    <StyledBackgroundView>
                        <StyledWindowView>
                            {loading ?
                                (<ActivityIndicator size={'large'} color={'white'} style={{margin: VIEW_MARGIN}}/>) :
                                (<View style={{
                                    alignItems: 'center', borderRadius: 5,
                                    margin: VIEW_MARGIN,
                                    justifyContent: 'center'
                                }}>
                                    {onlyTextContent ? (null) : (<Icon name={image} size={33} color={'white'}/>)}
                                    <Text style={{
                                        color: 'white',
                                        margin: VIEW_MARGIN / 2,
                                        fontSize: 14
                                    }}>{this.props.content}</Text>
                                </View>)
                            }
                        </StyledWindowView>
                    </StyledBackgroundView>
                </TouchableOpacity>


            </Modal>
        )


    }
}