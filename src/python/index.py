from pymongo import MongoClient
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.tree import export_graphviz
import pydotplus
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np


## 设置终端显示的最大列数和最大行数
pd.set_option('display.max_columns', 1000)
pd.set_option('display.max_rows', 1000)
# pd.set_option('display.width', 2000)

## 读取数据库数据
client = MongoClient('mongodb://localhost:27017/')
db = client['datacenter']

collection = db['AiData']

## 指定要忽略的字段
projection = {'_id': 0, '_created_at': 0 ,'_updated_at':0,'homeScore':0,'guestScore':0}

batch_size = 1000
data = []

for i in range(0, collection.count_documents({}), batch_size):
    batch = list(collection.find({}, projection).skip(i).limit(batch_size))
    data.extend(batch)

df = pd.DataFrame(data)

## 将多个列转换为数字类型
cols_to_convert = df.columns

df[cols_to_convert] = df[cols_to_convert].apply(pd.to_numeric, errors='coerce')


df = df.dropna(axis=1)

## 计算相关性矩阵
corr_matrix = df.corr()


## 选择最相关的特征
# relevant_features = corr_matrix.index[abs(corr_matrix['reslut']) > 0.019]
relevant_features = ['prevHomeNameScore', 'drawTouzhuE', 'sanhuWinXinli',
       'sanhuDrawXinli', 'sanhuLoseXinli', 'zhuangjiaWinXinli',
       'zhuangjiaDrawXinli', 'zhuangjiaLoseXinli', 'liangduiWinLishi',
       'liangduiDrawLishi', 'liangduiLoseLishi', 'lishirangqiu',
       'zuijinrangqiu', 'lishiqiushu', 'zuijinqiushu', 'zuijinguestqiushu',
       'zuijinguestmaxqiushu', 'zuijinhomediuqiushu', 'zuijinguestdiuqiushu',
       'homehistoryscore', 'guesthistoryscore', 'fiveavgjinqiushu',
       'fouravgdiuqiushu', 'fouravgjinqiushu', 'rangqiuqian', 'rangqiuhou',
       'qiushuqian', 'qiushuhou', 'touzhuhomebili', 'touzhuguestbili',
       'homeprevbisaiscore', 'guestprevbisaiscore', 'homeprevbisaijiqiu',
       'guestTwojinqiushu', 'homeTwodiuqiushu', 'homeTwoshuying',
       'guestTwoshuying', 'homevsguestshuying', 'guestvshomeshuying']

## 输出最相关的特征
print(relevant_features)

## 将数据分为训练集和测试集
X = df[relevant_features]
y = df['reslut']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

##训练随机森林模型
rf_model = RandomForestRegressor()
rf_model.fit(X_train, y_train)

##使用测试集进行模型评估
rf_score = rf_model.score(X_test, y_test)
print('随机森林模型得分:', rf_score)

## 使用模型进行预测
# y_pred_dt = dt_model.predict(X_test)
y_pred_rf = rf_model.predict(X_test)

print('随机森林预测结果:', y_pred_rf)

# dot_data = export_graphviz(rf_model[0], out_file=None, 
#                            feature_names=X.columns,  
#                            class_names=y.unique(),  
#                            filled=True, rounded=True,  
#                            special_characters=True)

# graph = pydotplus.graph_from_dot_data(dot_data)

# graph.write_png('decision_tree.png')


collection = db['ForeCastData']

## 指定要忽略的字段
projection = {'_id': 0, '_created_at': 0 ,'_updated_at':0,'homeScore':0,'guestScore':0}

batch_size = 1000
dataNew = []

for i in range(0, collection.count_documents({}), batch_size):
    batch = list(collection.find({}, projection).skip(i).limit(batch_size))
    dataNew.extend(batch)

dfNew = pd.DataFrame(dataNew)

y_predNew = rf_model.predict(dfNew[relevant_features])

print('预测结果:', y_predNew)

# 将预测结果添加到新数据中
dfNew['predicted_homeScore'] = y_predNew
print(dfNew[["home","time","predicted_homeScore"]])

## 可视化预测结果
# plt.plot(y_predNew)
# plt.title('result')
# plt.xlabel('donet')
# plt.ylabel('homeScore Value')
# plt.show()