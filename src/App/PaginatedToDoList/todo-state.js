import { db } from "../firebase";

const COLLECTION_NAME = "todos";

// Call this using the ID for the item
const fetchItem = async (id) => {
  return db.collection(COLLECTION_NAME).doc(id).get();
};

const processPage = (page, pageSize) => {
  var items = page.docs.map((doc) => doc.data());
  return {
    data: items.slice(0, pageSize),
    morePagesAvailable: items.length > pageSize - 1,
  };
};

// Call this using the ID for the first item in the list
// Also determines if there are more items before or after
const fetchFirstPage = async (userId, pageSize) => {
  var page = await db
    .collection(COLLECTION_NAME)
    .where("user", "==", userId)
    .orderBy("createdAt", "asc")
    .limit(pageSize + 1)
    .get();
  return processPage(page, pageSize);
};

// Call this using the ID for the last item in the list
const fetchAfter = async (userId, itemId, pageSize) => {
  var item = await fetchItem(itemId);
  var next = await db
    .collection(COLLECTION_NAME)
    .where("user", "==", userId)
    .orderBy("createdAt", "asc")
    .startAt(item)
    .limit(pageSize + 1)
    .get();
  return processPage(next, pageSize);
};

// Call this using the ID for the first item in the list
const fetchBefore = async (userId, itemId, pageSize) => {
  var item = await fetchItem(itemId);
  var previous = await db
    .collection(COLLECTION_NAME)
    .where("user", "==", userId)
    .orderBy("createdAt", "asc")
    .endAt(item)
    .limitToLast(pageSize + 1)
    .get();
  return processPage(previous, pageSize);
};

export { fetchFirstPage, fetchAfter, fetchBefore };
