const Item = require('../models/Item')
const { NotFoundError, ValidationError, BadRequestError } = require('../utils/errors')


exports.getItems = async (nyxciphers) => {
    let items = []
    nyxciphers.map(nyxcipher => items.push(nyxcipher.nyxcipher_item_id))
    console.log(items)
	return items
}

exports.getItem = async (id) => {
    console.log(id)
    const item = await Item.findById(id)
	return item
}

exports.saveItem = async (body) => {
    console.log(body)
    const {item_value, item_name, item_summary, highlights_list, item_specifications, item_features, item_thumbnail, item_images} = body.item

    let item = new Item({
        item_price: item_value,
        item_name: item_name,
        item_summary: item_summary,
        highlights_list: highlights_list,
        item_specifications: item_specifications,
        item_features: item_features,
        item_thumbnail: item_thumbnail,
        item_images: item_images,
    })

    await item.save()

	return item
}

exports.updateItem = async (id, body) => {
    const {item_value, item_name, item_summary, highlights_list, item_specifications, item_features, item_thumbnail, item_images} = body
    let item = await Item.findById(id)
    if (!item) throw new NotFoundError('Item not found')
    let update_item = {
        ...item._doc,
        item_price: item_value ? item_value:item._doc.item_price,
        item_name: item_name ? item_name:item._doc.item_name,
        item_summary: item_summary ? item_summary:item._doc.item_summary,
        highlights_list: highlights_list ? highlights_list:item._doc.highlights_list,
        item_specifications: item_specifications ? item_specifications:item._doc.item_specifications,
        item_features: item_features ? item_features:item._doc.item_features,
        item_thumbnail: item_thumbnail ? item_thumbnail:item._doc.item_thumbnail,
        item_images: item_images ? item_images:item._doc.item_images,
    }

    console.log(update_item)
    await item.updateOne(update_item)

    return update_item
}

exports.deleteItem = async (id) => {
    let item = await Item.findById(id)
    if (!item) throw new NotFoundError('Item not found')
    await item.deleteOne()
	return true
}
