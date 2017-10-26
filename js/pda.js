/**
 * Created by Chou on 2015/12/17.
 */

//获取PDA信息
$(function () {
    $.ajax({
        type: 'GET',
        url: '' + APIurl + '/pda',
        success: function (pda) {
            //if (pda.code == 200)
            for (var key in pda.data) {
                var value = pda.data[key];
                $('#pda_info').append('<tr>' + '<td>' + value.area_id + '</td>' + '<td>' + value.offical_id + '</td>' + '<td>' + value.enabled + '</td>' + '<td>' + value.digital_case_version + '</td>' + '</tr>');
                $('#delete_pda_id').append('<option value="' + pda.data[key].pdaId + '">' + pda.data[key].pdaId + '</option>');
                $('#delete_area_id').append('<option value="' + pda.data[key].areaId + '">' + pda.data[key].areaId + '</option>');
            }
        },
        error: function (pda) {
            if (pda.code == 400)
                alert('客户端请求异常！');
            if (pda.code == 500)
                alert('服务端异常!');
        }
    });
});

//添加PDA信息
function addPDA() {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    var json_pda_add = $('#form_pda_add').serializeObject();
    $.ajax({
        type: 'POST',
        url: '' + APIurl + '/pda/add',
        data: json_pda_add,
        success: function (msg) {
            console.log(msg.data);
            console.log(JSON.stringify(json_pda_add));
            alert('添加PDA信息成功');
        }
    });
}

//删除PDA信息
function deletePDA() {
    $.ajax({
        type: 'POST',
        url: '' + APIurl + '/pda/delete',
        data: {pdaId: "$('#delete-pda-id option:selected')"},
        success: function (msg) {
            $('#delete-pda-id option:selected').remove();
            alert('删除成功');
            console.log(msg.data);
        }
    });
}
