#encoding: utf-8

class ShareholderController < AdminController
  def index
    @start_day = params[:start_day] || 2.week.ago.to_date.to_s
    @end_day = params[:end_day] || 1.day.ago.to_date.to_s

    date_span = @start_day.to_date..@end_day.to_date

    result = []
    date_span.each do |day|
      date_span = Time.parse(day.to_s)..Time.parse(day.to_s).tomorrow

      trackers = Tracker.where(:day => date_span).where(:lc => /referral_id=/)

      result << {
        :day => day,
        :referral_pv_count => trackers.count,
        :referral_user_count => trackers.map{|n| n['lc'].match(/referral_id=([0-9]+)/).to_a.last}.uniq.count,
        :submitted_count => HouseOrder.where(:created_at => date_span, :referral.ne => nil).map(&:number_night_count).reduce(:+),
        :paid_count => HouseOrder.where(:paid_at => date_span, :referral.ne => nil).map(&:number_night_count).reduce(:+),
        :dividend => (HouseOrder.where(:end_day.lte => Time.parse(day.to_s)).where(:referral.ne => nil).map(&:full_price).reduce(:+).to_f * 0.05).round(2),
        :new_user_count => User.where(:created_at => date_span,:referral_id.ne => nil).count,
      }
    end

    @shareholder_chart = LazyHighCharts::HighChart.new('graph') do |f|
      f.title(:text => "股东计划")
      f.xAxis(:categories => result.map{|row| row[:day].strftime("%d(%a)")})
      f.series(:name => "分红", :yAxis => 0, :data => result.map{|row| row[:dividend]}, :type => 'column')
      f.series(:name => '点击量', :yAxis => 1, :data => result.map{|row| row[:referral_pv_count]})
      f.series(:name => '有效股东数', :yAxis => 1, :data => result.map{|row| row[:referral_user_count]})
      f.series(:name => '提交间夜数', :yAxis => 1, :data => result.map{|row| row[:submitted_count]})
      f.series(:name => "成交间夜数", :yAxis => 1, :data => result.map{|row| row[:paid_count]})
      f.series(:name => "新用户数", :yAxis => 1, :data => result.map{|row| row[:new_user_count]})

      f.yAxis [
        {:title => {:text => " "}},
        {:title => {:text => "金额"}, :opposite => true},
      ]
    end

    ###################################股东统计表格#############################

    #汇总行内容
    referral_id = User.where(:referral_id.ne => nil).map(&:referral_id).uniq
    user_count = referral_id.count #用户数
    sub_count = HouseOrder.where(:created_at.lte => Time.parse(@end_day.to_s).tomorrow, :referral.ne => nil).map(&:number_night_count).reduce(:+) #累计提交间夜  Time.now.tomorrow
    count_paid_base = HouseOrder.where(:paid_at.lte => Time.parse(@end_day.to_s).tomorrow, :referral.ne => nil)   # Time.now.tomorrow
    paid_count = count_paid_base.map(&:number_night_count).reduce(:+) #累计提交间夜
    paid_charge = count_paid_base.map(&:full_price).reduce(:+)   #累计成交间夜
    dividend_count = (HouseOrder.where(:end_day.lte => Time.now).where(:referral.ne => nil).map(&:full_price).reduce(:+).to_f * 0.05).round(2)

    @shareholder_ops = [
      ['账号ID','账号昵称', '累计用户数', '累计提交间夜数', '累计成交间夜数', '累计销售额','累计分红','邮箱地址'],
      ['汇总','-',user_count,sub_count,paid_count,paid_charge,dividend_count,'-'],
    ]

    @shareholder_ops_body = []
    referral_id.each do |data|

      ref_base = User.where(:user_id => data)
      if ref_base.first != nil then
        ref_name = ref_base.first['nickname']
        base_paid = HouseOrder.where(:paid_at.lte => Time.parse(@end_day.to_s).tomorrow, :referral => ref_name )
        submitted = HouseOrder.where(:created_at.lte => Time.parse(@end_day.to_s).tomorrow, :referral => ref_name )
        @shareholder_ops_body << [ 
          data,
          ref_name,
          User.where(:referral_id => data).count,
#          if submitted.map(&:number_night_count).blank? then '-' else submitted.map(&:number_night_count).reduce(:+) end,  #累计提交间夜数
          submitted.map(&:number_night_count).reduce(:+).to_i,   #累计提交间夜数
          #if base_paid.map(&:number_night_count).blank?  then '-' else base_paid.map(&:number_night_count).reduce(:+) end,#累计成间夜交
          base_paid.map(&:number_night_count).reduce(:+).to_i ,#累计成间夜交
          if base_paid.map(&:full_price).blank?  then '-' else  base_paid.map(&:full_price).reduce(:+) end,  #累计成交金额
          (HouseOrder.where(:end_day.lte => Time.now).where(:referral => ref_name ).map(&:full_price).reduce(:+).to_f * 0.05).round(2),#累计分红 
          if User.where(:user_id => data).first != nil then User.where(:user_id => data).first['email'] else '-' end, #mail
        ] 
      else
        @shareholder_ops_body << [ 
          data,
          '-',
          User.where(:referral_id => data).count,
          '-',
          '-',
          '-',
          '-',
          if User.where(:user_id => data).first != nil then User.where(:user_id => data).first['email'] else '-' end, #mail
        ] 
      end 
    end

    #以累计成交间夜排序(位置5)
    @shareholder_ops_body = @shareholder_ops_body.sort{ |n,m|  m[4].to_i <=> n[4].to_i } 
    @shareholder_ops.concat(@shareholder_ops_body)


    #HouseOrder.where(:referral.exists => true, :referral.ne => nil)
  end
end
