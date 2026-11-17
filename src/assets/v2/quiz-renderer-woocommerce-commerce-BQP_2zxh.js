const __vite__fileDeps=["./quiz-renderer-storefront-reporter-BOMu-Y8J.js","./quiz-renderer.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import { __vitePreload } from "./quiz-renderer.js";
import { createQuizCartView } from "./quiz-renderer-recommendation-cart-BwOZ-x1U.js";
const API = "/wp-json/wc/store/v1";
const gid = (kind, id) => `gid://woocommerce/${kind}/${id}`;
const numericId = (id) => {
  const value = String(id).split("/").pop() ?? "";
  if (!/^\d+$/.test(value) || Number(value) <= 0) throw new Error("Invalid WooCommerce id");
  return Number(value);
};
const image = (value) => value ? { url: value.src, altText: value.alt ?? "" } : void 0;
const money = (prices, value) => ({
  amount: (Number(value) / 10 ** prices.currency_minor_unit).toFixed(prices.currency_minor_unit),
  currencyCode: prices.currency_code
});
const text = (value) => {
  const element = document.createElement("div");
  element.innerHTML = value;
  return element.textContent ?? "";
};
const productCard = (product) => ({
  id: gid("Product", product.id),
  title: text(product.name),
  handle: product.slug,
  description: text(product.description),
  onlineStoreUrl: product.permalink,
  images: { edges: product.images.map((entry) => ({ node: image(entry) })) },
  options: product.attributes.map((attribute) => {
    var _a;
    return {
      name: attribute.name,
      values: ((_a = attribute.terms) == null ? void 0 : _a.map((term) => text(term.name))) ?? []
    };
  })
});
const variantCard = (variant, parent, attributes = variant.attributes) => ({
  id: gid("ProductVariant", variant.id),
  title: attributes.map((attribute) => attribute.value).filter(Boolean).map((value) => text(value ?? "")).join(" / "),
  product: parent,
  availableForSale: variant.is_in_stock && variant.is_purchasable,
  price: money(variant.prices, variant.prices.price),
  compareAtPrice: Number(variant.prices.regular_price) > Number(variant.prices.price) ? money(variant.prices, variant.prices.regular_price) : null,
  image: image(variant.images[0]),
  selectedOptions: attributes.filter((attribute) => attribute.value).map((attribute) => ({
    name: attribute.name ?? attribute.attribute,
    value: text(attribute.value ?? "")
  }))
});
const confirmedCart = (cart) => ({
  item_count: cart.items_count,
  items: cart.items.map(({ id, key, quantity }) => ({ id, key, quantity }))
});
function createWooCommerceCommerce(getResponseId = () => void 0, getAssistant, shop = "") {
  let nonce;
  let responseId;
  let assistantChatId;
  const request = async (path, body) => {
    try {
      const response = await fetch(`${API}${path}`, {
        credentials: "same-origin",
        cache: "no-store",
        ...body && {
          method: "POST",
          headers: { "Content-Type": "application/json", Nonce: nonce ?? "" },
          body: JSON.stringify(body)
        }
      });
      nonce = response.headers.get("Nonce") || nonce;
      if (!response.ok) throw new Error(`WooCommerce Store API ${path}: HTTP ${response.status}`);
      return { response, data: await response.clone().json() };
    } catch (error) {
      void __vitePreload(async () => {
        const { reportStorefrontError } = await import("./quiz-renderer-storefront-reporter-BOMu-Y8J.js");
        return { reportStorefrontError };
      }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then(({ reportStorefrontError }) => reportStorefrontError(error, shop, "woocommerce")).catch(() => {
      });
      throw error;
    }
  };
  const readCart = async () => (await request("/cart")).data;
  const mutate = async (path, body) => {
    await readCart();
    return request(path, body);
  };
  const refresh = async () => {
    document.body.dispatchEvent(new CustomEvent("wc-blocks_added_to_cart", { bubbles: true }));
    const jquery = window.jQuery;
    jquery == null ? void 0 : jquery(document.body).trigger("wc_fragment_refresh");
  };
  const addLine = (line) => {
    var _a, _b;
    return mutate("/cart/add-item", {
      id: numericId(line.id),
      quantity: line.quantity ?? 1,
      extensions: {
        prq: {
          ...responseId || getResponseId() ? { __quiz_response_id: responseId || getResponseId() } : {},
          ...assistantChatId || ((_a = getAssistant == null ? void 0 : getAssistant()) == null ? void 0 : _a.chatId) ? { __assistant_chat_id: assistantChatId || ((_b = getAssistant == null ? void 0 : getAssistant()) == null ? void 0 : _b.chatId) } : {}
        }
      }
    });
  };
  const cart = createQuizCartView({
    fetchCart: async () => confirmedCart(await readCart()),
    addToCart: async ([line]) => confirmedCart((await addLine(line)).data),
    changeToCart: async ({ id, quantity }) => confirmedCart(
      (await mutate(quantity ? "/cart/update-item" : "/cart/remove-item", {
        key: id,
        ...quantity ? { quantity } : {}
      })).data
    ),
    refreshCartUI: refresh
  });
  const list = async (path, ids, extra = "") => {
    const result = [];
    for (let offset = 0; offset < ids.length; offset += 100) {
      result.push(
        ...(await request(
          `${path}?include=${ids.slice(offset, offset + 100).join(",")}&per_page=100${extra}`
        )).data
      );
    }
    return result;
  };
  let started = false;
  return {
    async items(ids) {
      var _a, _b;
      const productIds = ids.filter((id) => id.startsWith("gid://woocommerce/Product/")).map(numericId);
      const variantIds = ids.filter((id) => id.startsWith("gid://woocommerce/ProductVariant/")).map(numericId);
      const categoryIds = ids.filter((id) => id.startsWith("gid://woocommerce/Collection/")).map(numericId);
      const products = await list("/products", productIds);
      const variants = await list(
        "/products",
        [
          .../* @__PURE__ */ new Set([
            ...variantIds,
            ...products.flatMap((product) => {
              var _a2;
              return ((_a2 = product.variations) == null ? void 0 : _a2.map(({ id }) => id)) ?? [];
            })
          ])
        ],
        "&type=variation"
      );
      const missing = variantIds.filter((id) => !variants.some((variant) => variant.id === id));
      variants.push(...await list("/products", missing));
      const parents = [
        ...new Set(
          variants.map((variant) => variant.parent).filter((id) => !!id && !products.some((product) => product.id === id))
        )
      ];
      products.push(...await list("/products", parents));
      const result = {};
      for (const product of products) {
        const card = productCard(product);
        const nodes = product.type === "variable" ? (product.variations ?? []).flatMap((variation) => {
          const variant = variants.find(({ id }) => id === variation.id);
          return variant ? [variantCard(variant, card, variation.attributes)] : [];
        }) : [variantCard(product, card, [])];
        result[card.id] = { ...card, variants: { edges: nodes.map((node) => ({ node })) } };
      }
      for (const variant of variants) {
        const parent = products.find(({ id }) => id === (variant.parent || variant.id)) ?? variant;
        result[gid("ProductVariant", variant.id)] = variantCard(
          variant,
          productCard(parent),
          ((_b = (_a = parent.variations) == null ? void 0 : _a.find(({ id }) => id === variant.id)) == null ? void 0 : _b.attributes) ?? variant.attributes
        );
      }
      for (const category of await list("/products/categories", categoryIds)) {
        result[gid("Collection", category.id)] = {
          id: gid("Collection", category.id),
          title: text(category.name),
          onlineStoreUrl: category.permalink,
          image: image(category.image)
        };
      }
      return result;
    },
    async applyDiscount(code) {
      await mutate("/cart/apply-coupon", { code });
      await refresh();
      return true;
    },
    async tagCart(id, chatId) {
      responseId = id;
      assistantChatId = chatId;
    },
    get cart() {
      if (!started) {
        started = true;
        void cart.reconcile().catch(() => {
        });
      }
      return cart;
    },
    async add(variantId) {
      await addLine({ id: variantId, quantity: 1 });
      await cart.reconcile();
      await refresh();
    },
    async plans() {
      return void 0;
    },
    async addItems(body) {
      var _a;
      let lines;
      if (body instanceof FormData || body instanceof URLSearchParams) {
        const id = body.get("id");
        lines = id ? [{ id: String(id), quantity: Number(body.get("quantity") ?? 1) }] : [];
        if (!id)
          for (const [key, value] of body.entries()) {
            const match = /^items\[(\d+)\]\[(id|quantity)\]$/.exec(key);
            if (!match) continue;
            const line = lines[_a = Number(match[1])] ?? (lines[_a] = { id: "" });
            if (match[2] === "id") line.id = String(value);
            else line.quantity = Number(value);
          }
        lines = lines.filter((line) => line == null ? void 0 : line.id);
      } else lines = Array.isArray(body.items) ? body.items : [body];
      const added = [];
      let response;
      for (const line of lines) {
        const result = await addLine(line);
        response = result.response;
        const item = result.data.items.find(({ id }) => id === numericId(line.id));
        if (item)
          added.push({
            quantity: line.quantity ?? 1,
            variant: {
              id: gid("ProductVariant", item.id),
              title: text(item.name),
              price: money(item.prices, item.prices.price)
            }
          });
        await refresh();
      }
      if (!response) throw new Error("No cart items requested");
      await cart.reconcile();
      return { response, added };
    },
    dispose() {
      cart.dispose();
    }
  };
}
export {
  createWooCommerceCommerce
};
