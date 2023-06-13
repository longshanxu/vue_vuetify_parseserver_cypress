'''
Author: longshanxu 623119632@qq.com
Date: 2023-06-12 19:05:51
LastEditors: longshanxu 623119632@qq.com
LastEditTime: 2023-06-12 19:44:50
FilePath: \vue_vuetify_parseserver_cypress\src\python\outpat.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''
from pymongo import MongoClient
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd

# 读取Mongo的数据
client = MongoClient('mongodb://localhost:27017/')
db = client['datacenter']

collection = db['AiData']

## 指定要忽略的字段
projection = {'_id': 0, '_created_at': 0 ,'_updated_at':0 ,'homeScore':0,'guestScore':0}

batch_size = 1000
data = []

for i in range(0, collection.count_documents({}), batch_size):
    batch = list(collection.find({}, projection).skip(i).limit(batch_size))
    data.extend(batch)

df = pd.DataFrame(data)

cols_to_convert = df.columns

df[cols_to_convert] = df[cols_to_convert].apply(pd.to_numeric, errors='coerce')


df = df.dropna(axis=1)

# 将数据集分为特征和标签
X = df.drop('reslut', axis=1)
y = df['reslut']

# 将数据集分为训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 定义随机森林模型
rfc = RandomForestClassifier()

# 训练模型
rfc.fit(X, y)

# 使用测试集进行模型评估
rf_score = rfc.score(X_test, y_test)

# 打印准确率
print("随机森林模型的准确率为：", rf_score)

# # 输出特征重要性
# feature_importances = rfc.feature_importances_
# print(feature_importances)

# feature_ranking = rfc.feature_importances_.argsort()[::-1]
# print(feature_ranking)

# 创建特征重要性DataFrame
# feature_importances_df = pd.DataFrame({'feature': X.columns, 'importance': rfc.feature_importances_})

# # 按特征重要性排序
# feature_importances_df = feature_importances_df.sort_values('importance', ascending=False)
# print(feature_importances_df)

# # 输出最重要的特征
# print(feature_importances_df.iloc[0]['feature'])