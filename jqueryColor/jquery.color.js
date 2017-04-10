(function ($) {

    var color = {
        defaultColor: '#FF9900',
        initialObj: {},
        colorVal: '',
        callback: {},
        colorArray: [],
        //修改滑块颜色
        editSliderGradient: function (collrVal) {

            collrVal = collrVal || this.defaultColor;
            this.colorArray = this.colorDecimal(collrVal);

            //饱和度（上半部分0-39）
            var R_Unit = (255 - this.colorArray[0]) / 40;
            var G_Unit = (255 - this.colorArray[1]) / 40;
            var B_Unit = (255 - this.colorArray[2]) / 40;
            for (var i = 1, p = 39; p >= 1; i++ , p--) {
                $('.colorLayer .colorLayer-right span').eq(p).css('background-color', 'rgb(' + Math.round(this.colorArray[0] + R_Unit * i) + ',' + Math.round(this.colorArray[1] + G_Unit * i) + ',' + Math.round(this.colorArray[2] + B_Unit * i) + ')');
            }

            //中间不做四舍五入，减小色差
            $('.colorLayer .colorLayer-right span').eq(40).css('background-color', 'rgb(' + this.colorArray[0] + ',' + this.colorArray[1] + ',' + this.colorArray[2] + ')');

            //明度（下半部分41-79）
            var R_Unit = this.colorArray[0] / 40;
            var G_Unit = this.colorArray[1] / 40;
            var B_Unit = this.colorArray[2] / 40;
            for (var i = 40, p = 41; p <= 79; i-- , p++) {
                $('.colorLayer .colorLayer-right span').eq(p).css('background-color', 'rgb(' + Math.round(R_Unit * i) + ',' + Math.round(G_Unit * i) + ',' + Math.round(B_Unit * i) + ')');
            }
            this.colorVal = this.HexVal(this.colorArray);
        },
        //颜色值转十进制RGB数组
        colorDecimal: function (colorVal) {
            //6位十六进制颜色码
            if (/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.test(colorVal)) {
                return this.convertedVal(function (val) {
                    return parseInt(val, 16);
                });
            }
            //3位十六进制颜色码
            else if (/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(colorVal)) {
                return this.convertedVal(function (val) {
                    return parseInt(val + val, 16);
                });
            }
            //RGB
            else if (/^rgb\((.*),(.*),(.*)\)$/i.test(colorVal)) {
                return this.convertedVal(function (val) {
                    //百分比
                    if (val.indexOf('%') > 0) {
                        return 2.55 * parseFloat(val);
                    }
                    //0-255十进制
                    else {
                        return parseFloat(val);
                    }
                });
            } else {
                return 0;
            }
        },
        //补位
        ZeroPadding: function (val) {
            if (val.length === 2) {
                return val;
            } else if (val.length === 1) {
                return '0' + val;
            } else {
                return '00';
            }
        },
        //RGB数组转16进制颜色码
        HexVal: function (v) {
            return '#' + this.ZeroPadding(v[0].toString(16)) + this.ZeroPadding(v[1].toString(16)) + this.ZeroPadding(v[2].toString(16));
        },
        checkVal: function (v, fn) {
            if (/^#([a-f0-9]{3}){1,2}$/i.test(v)) {
                fn(v);
            } else {
                alert("请输入正确的颜色代码");
            }
        },
        //返回RGB数组
        convertedVal: function (fn) {
            return [fn(RegExp.$1), fn(RegExp.$2), fn(RegExp.$3)];
        },
        //生成Code
        createGradientCode: function () {
            if ($('.colorLayer').length) {
                $('.colorLayer,.colorLayerShade').show();
            } else {
                var colorArray = [
                    ['ffffff', 'ffcccc', 'ff9999', 'ff6666', 'ff3333', 'ff0000', 'cc0000', '990000', '660000', '330000', '000000'],
                    ['ffffff', 'ffd2cc', 'ffa699', 'ff7966', 'ff4d33', 'ff2100', 'cc1a00', '991300', '660d00', '330600', '000000'],
                    ['ffffff', 'ffd9cc', 'ffb399', 'ff8d66', 'ff6733', 'ff4200', 'cc3400', '992700', '661a00', '330d00', '000000'],
                    ['ffffff', 'ffdfcc', 'ffc099', 'ffa166', 'ff8233', 'ff6300', 'cc4f00', '993b00', '662700', '331300', '000000'],
                    ['ffffff', 'ffe6cc', 'ffcd99', 'ffb566', 'ff9c33', 'ff8400', 'cc6900', '994f00', '663400', '331a00', '000000'],
                    ['ffffff', 'ffedcc', 'ffdb99', 'ffc966', 'ffb733', 'ffa500', 'cc8400', '996300', '664200', '332100', '000000'],
                    ['ffffff', 'fff0cc', 'ffe299', 'ffd366', 'ffc533', 'ffb700', 'cc9200', '996d00', '664900', '332400', '000000'],
                    ['ffffff', 'fff4cc', 'ffe999', 'ffde66', 'ffd333', 'ffc900', 'cca000', '997800', '665000', '332800', '000000'],
                    ['ffffff', 'fff7cc', 'fff099', 'ffe966', 'ffe233', 'ffdb00', 'ccaf00', '998300', '665700', '332b00', '000000'],
                    ['ffffff', 'fffbcc', 'fff799', 'fff466', 'fff033', 'ffed00', 'ccbd00', '998e00', '665e00', '332f00', '000000'],
                    ['ffffff', 'ffffcc', 'ffff99', 'ffff66', 'ffff33', 'ffff00', 'cccc00', '999900', '666600', '333300', '000000'],
                    ['ffffff', 'f4f9cc', 'eaf499', 'e0ef66', 'd6ea33', 'cce500', 'a3b700', '7a8900', '515b00', '282d00', '000000'],
                    ['ffffff', 'eaf4cc', 'd6ea99', 'c1e066', 'add633', '99cc00', '7aa300', '5b7a00', '3d5100', '1e2800', '000000'],
                    ['ffffff', 'e0efcc', 'c1e099', 'a3d066', '84c133', '66b200', '518e00', '3d6a00', '284700', '142300', '000000'],
                    ['ffffff', 'd6eacc', 'add699', '84c166', '5bad33', '339900', '287a00', '1e5b00', '143d00', '0a1e00', '000000'],
                    ['ffffff', 'cce5cc', '99cc99', '66b266', '339933', '008000', '006600', '004c00', '003300', '001900', '000000'],
                    ['ffffff', 'ccead6', '99d6ad', '66c184', '33ad5b', '009933', '007a28', '005b1e', '003d14', '001e0a', '000000'],
                    ['ffffff', 'ccefe0', '99e0c1', '66d0a3', '33c184', '00b266', '008e51', '006a3d', '004728', '002314', '000000'],
                    ['ffffff', 'ccf4ea', '99ead6', '66e0c1', '33d6ad', '00cc99', '00a37a', '007a5b', '00513d', '00281e', '000000'],
                    ['ffffff', 'ccf9f4', '99f4ea', '66efe0', '33ead6', '00e5cc', '00b7a3', '00897a', '005b51', '002d28', '000000'],
                    ['ffffff', 'ccffff', '99ffff', '66ffff', '33ffff', '00ffff', '00cccc', '009999', '006666', '003333', '000000'],
                    ['ffffff', 'ccf4ff', '99eaff', '66e0ff', '33d6ff', '00ccff', '00a3cc', '007a99', '005166', '002833', '000000'],
                    ['ffffff', 'cceaff', '99d6ff', '66c1ff', '33adff', '0099ff', '007acc', '005b99', '003d66', '001e33', '000000'],
                    ['ffffff', 'cce0ff', '99c1ff', '66a3ff', '3384ff', '0066ff', '0051cc', '003d99', '002866', '001433', '000000'],
                    ['ffffff', 'ccd6ff', '99adff', '6684ff', '335bff', '0033ff', '0028cc', '001e99', '001466', '000a33', '000000'],
                    ['ffffff', 'ccccff', '9999ff', '6666ff', '3333ff', '0000ff', '0000cc', '000099', '000066', '000033', '000000'],
                    ['ffffff', 'd1ccf9', 'a399f4', '7566ef', '4733ea', '1900e5', '1400b7', '0f0089', '0a005b', '05002d', '000000'],
                    ['ffffff', 'd6ccf4', 'ad99ea', '8466e0', '5b33d6', '3300cc', '2800a3', '1e007a', '140051', '0a0028', '000000'],
                    ['ffffff', 'dbccef', 'b799e0', '9366d0', '6f33c1', '4c00b2', '3c008e', '2d006a', '1e0047', '0f0023', '000000'],
                    ['ffffff', 'e0ccea', 'c199d6', 'a366c1', '8433ad', '660099', '51007a', '3d005b', '28003d', '14001e', '000000'],
                    ['ffffff', 'e5cce5', 'cc99cc', 'b266b2', '993399', '800080', '660066', '4c004c', '330033', '190019', '000000']
                ];

                //生成色块
                var colorCode = '';
                for (var i in colorArray) {
                    var colorArrayOne = colorArray[i];
                    colorCode += '<ul>';
                    for (var l in colorArrayOne) {
                        colorCode += '<li style="background-color:#' + colorArrayOne[l] + '"></li>';
                    }
                    colorCode += '</ul>';
                }

                //生成色条
                var sliderCode = '<span style="background-color:rgb(255,255,255)"></span>';
                for (var i = 1; i <= 79; i++) {
                    sliderCode += '<span></span>';
                }
                sliderCode += '<span style="background-color:rgb(0,0,0)"></span>';

                var colorLayer = '<div class="colorLayer"><div class="colorLayerTitle">颜色拾取器<span class="colorLayerClose"></span></div><div class="colorLayerContent"><div class="colorSelect"><div class="colorLayer-left">' + colorCode + '</div><div class="colorLayer-right">' + sliderCode + '</div></div><div class="colorLayerSetUp"><label>颜色值：<input class="editorColorValue"></label><span class="colorIndicator" style="background-color:' + this.defaultColor + '"></span><span class="colorLayerButton colorLayerCancel">取消</span><span class="colorLayerButton colorLayerDetermine">确定</span></div></div></div><div class="colorLayerShade"></div>';

                $('body').after(colorLayer);
                color.editSliderGradient();//为色条添加默认色

                var x = ($(window).width() - $('.colorLayer').outerWidth()) / 2;
                var y = ($(window).height() - $('.colorLayer').outerHeight()) / 2;
                $(".colorLayer").css({ "left": x, "top": y }).show();

                //关闭按钮
                $('.colorLayerClose,.colorLayerCancel').live('click', function () {
                    $('.colorLayer,.colorLayerShade').hide();
                });

                //确定按钮
                $('.colorLayerDetermine').live('click', function () {
                    var collrVal = $('.colorLayer .editorColorValue').val();
                    color.checkVal(collrVal, function (collrVal) {
                        color.callback(collrVal);//自定义回调
                        $('.colorLayer,.colorLayerShade').hide();
                    });
                });

                //选色块
                $('.colorLayer-left li').live('click', function () {
                    var thisCollr = $(this).css('background-color');
                    color.editSliderGradient(thisCollr);
                    $('.colorLayer .editorColorValue').val(color.colorVal);
                    $('.colorIndicator').css('background-color', thisCollr);
                });

                //选饱和度
                $('.colorLayer-right span').live('click', function () {
                    var thisCollr = $(this).css('background-color');
                    color.colorArray = color.colorDecimal(thisCollr);
                    $('.colorLayer .editorColorValue').val(color.HexVal(color.colorArray));
                    $('.colorIndicator').css('background-color', thisCollr);
                });

                //编辑颜色值
                $('.colorLayer .editorColorValue').live('blur', function () {
                    var colorVal = $(this).val();
                    color.checkVal(colorVal, function (collrVal) {
                        color.editSliderGradient(collrVal);
                        $('.colorIndicator').css('background-color', collrVal);
                    });
                });
            }
        }
    };

    $(function () {
        //动态载入CSS
        var thisJsLabel = $("script[src*='jquery.color']");
        if (thisJsLabel.length) {
            thisJsLabel.after('<link rel="stylesheet" href="' + thisJsLabel.attr('src').replace('.js', '.css') + '">');
        }
    });

    $.fn.color = function (callback) {
        this.off('click').live('click', function () {
            color.createGradientCode();
            color.callback = callback;
        });
        return this;
    };

})(jQuery);